import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';
import {interval, Observable, Subscription} from 'rxjs';
import {PlayStatus} from '../core/models/play-status.class';
import {Instrument} from '../core/models/instrument.enum';
import {FormsModule} from '@angular/forms';
import {JsonExportComponent} from '../components/json-export/json-export.component';
import {IAppState} from '../store/app-state.interface';
import {Store} from '@ngrx/store';
import {IProjectState} from '../store/project/project.reducer';
import {ProjectActions} from '../store/project/project.actions';
import {InstrumentsSet} from '../core/models/instruments-set.class';
import {EditMeasureComponent} from '../components/edit-measure/edit-measure.component';
import {Measure} from '../core/models/measure.class';
import {IEditMeasureRequest} from '../core/models/edit-measure-request.interface';
import {JsonPipe} from '@angular/common';
import {Row} from '../core/models/row.class';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    EditMeasureComponent,
    TabViewerComponent,
    FormsModule,
    JsonExportComponent,
    JsonPipe,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.sass',
})
export class PlayerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  project: Project;
  projectState$: Observable<IProjectState>;
  beatQuarter$: Observable<number>;
  beatQuarterSubscription: Subscription;
  playStatus: PlayStatus;
  audioContext: AudioContext;
  instruments: InstrumentsSet;
  editMeasureRequest: IEditMeasureRequest | undefined;


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.project = new Project();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.beatQuarter$ = new Observable();
    this.beatQuarterSubscription = new Subscription();
    this.playStatus = new PlayStatus();
    this.audioContext = new AudioContext();
    this.instruments = new InstrumentsSet(this.audioContext);
    this.instruments.load('set0');
    this.editMeasureRequest = undefined;
  }


  ngOnInit() {
    this.project = new Project();
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.project = projectState.project;
      })
    );
  }


  ngOnDestroy() {
    this.stop();
    this.subscription.unsubscribe();
    this.beatQuarterSubscription.unsubscribe();
  }


  /**
   * Starts the playback of the project if it is not already playing.
   * This method initializes the beat interval and subscribes to a beat tracker that advances
   * the playback state and performs associated actions such as updating the beat and metronome.
   * @return {void}
   */
  play(): void {
    if (!this.playStatus.playing) {
      this.playStatus.setAtStart();
      this.beatQuarter$ = interval(60000 / this.project.configuration.bpm / 4);
      this.beatQuarterSubscription = this.beatQuarter$.subscribe(
        (tick) => {
          this.unEnhanceBeat(this.playStatus);
          this.playStatus = this.advanceTick(this.project, this.playStatus);
          this.enhanceBeat(this.playStatus);
          this.metronome(this.playStatus);
          this.playBeat(this.playStatus);
        }
      );
    }
  }


  /**
   * Stops the current playback by unsubscribing from the beat quarter subscription,
   * unenchanting the current beat, and updating the play status to not playing.
   *
   * @return {void} No return value.
   */
  stop(): void {
    this.beatQuarterSubscription.unsubscribe();
    this.unEnhanceBeat(this.playStatus);
    this.playStatus.playing = false;
  }


  /**
   * Advances the musical tick within a project by incrementing the quarter, beat, measure, or row as necessary.
   * Resets the counters when they exceed their defined limits in the project's configuration.
   * Stops playback if the end of the available rows in the project is reached.
   *
   * @param {Project} project - The project containing configuration and rows data used to determine tick advancement.
   * @param {PlayStatus} status - The current play status representing the current position in the project.
   * @return {PlayStatus} The updated play status after advancing the tick.
   */
  advanceTick(project: Project, status: PlayStatus): PlayStatus {
    status.quarter++;
    if (status.quarter >= 4) {
      status.quarter = 0;
      status.beat++;
    }
    if (status.beat >= this.project.configuration.beatsPerMeasure) {
      status.beat = 0;
      status.measure++;
    }
    if (status.measure >= this.project.configuration.measuresPerBar) {
      status.measure = 0;
      status.row++;
    }
    if (status.row >= project.rows.length) {
      status.row = 0;
      this.stop();
    }
    return status;
  }


  /**
   * Enhances the visual appearance of a beat identified by the given PlayStatus.
   *
   * @param {PlayStatus} status - An object representing the current status of the play, containing row, measure, and beat properties.
   * @return {void} Does not return a value.
   */
  enhanceBeat(status: PlayStatus): void {
    const beat = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat);
    if (beat) {
      beat.style.backgroundColor = '#ffffaa';
    }
  }


  /**
   * Reverts the visual enhancement on the specified beat element within a musical grid.
   *
   * @param {PlayStatus} status - The current play status containing information about the specific row, measure, and beat to un-enhance.
   * @return {void} This method does not return a value.
   */
  unEnhanceBeat(status: PlayStatus): void {
    const beat = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat);
    if (beat) {
      beat.style.backgroundColor = '#ffffff';
    }
  }


  /**
   * Controls the metronome sound playback based on the current play status.
   *
   * @param {PlayStatus} status - The current status of the playback, including metronome on/off state and timing information.
   * @return {void} Does not return a value.
   */
  metronome(status: PlayStatus): void {
    if (status.metronome && status.beat === this.project.configuration.beatsPerMeasure -1 && status.quarter === 0) {
      this.instruments.play(Instrument.METRONOME_HI, false);
    } else if (status.metronome && status.quarter === 0) {
      this.instruments.play(Instrument.METRONOME, false);
    }
  }


  /**
   * Toggles the state of the metronome between on and off.
   */
  toggleMetronome(): void {
    this.playStatus.metronome = !this.playStatus.metronome;
  }


  /**
   * Toggles the music playback status.
   *
   * This method switches the current status of music playback between
   * playing and paused. If the music is currently playing, it will
   * pause the music. If the music is paused, it will start playing.
   *
   * @return {void}
   */
  toggleMusic(): void {
    this.playStatus.music = !this.playStatus.music;
  }


  /**
   * Plays the beat at the specified position in the music project if applicable.
   *
   * @param {PlayStatus} status - An object representing the current position in the music project, including row, measure, beat, and quarter, along with a flag indicating whether music should be played.
   * @return {void} This method does not return a value. It performs an action of playing notes.
   */
  playBeat(status: PlayStatus): void {
    const notes = this.project.rows[status.row].measures[status.measure].beats[status.beat].quarters[status.quarter].notes;
    if (notes && notes.length && status.music) {
      notes.forEach((note) => {
        this.instruments.play(note.instrument, note.accent);
      });
    }
  }


  /**
   * Imports a project into the current store by dispatching an import action.
   *
   * @param {Project} project - The project to be imported.
   * @return {void}
   */
  importProject(project: Project): void {
    this.store.dispatch(ProjectActions.import({project: project}));
  }



  /**
   * Open the measure editor
   *
   * @param {IEditMeasureRequest} request - The request object containing the new measurement details that need to be applied.
   * @return {void} This function does not return a value.
   */
  editMeasure(request: IEditMeasureRequest): void {
    this.editMeasureRequest = request;
  }


  /**
   * Applies measure changes based on the given editMeasureResponse.
   *
   * @param {IEditMeasureRequest} editMeasureResponse - The response containing information about the measure changes,
   *                                                    including rowIndex, measureIndex, and the new measure data.
   * @return {void} This method does not return a value. It dispatches the updated rows to the store and clears the current edit request.
   */
  applyMeasureChanges(editMeasureResponse: IEditMeasureRequest): void {
    if (editMeasureResponse) {
      this.store.dispatch(ProjectActions.updateRows({rows: this.project.getRowsWithReplacedMeasure(
          editMeasureResponse.rowIndex,
          editMeasureResponse.measureIndex,
          editMeasureResponse.measure,
        )}));
    }
    // empty request to hide the window
    this.editMeasureRequest = undefined;
  }


  /**
   * Dispatches an action to add an empty row to the project.
   * The new row is configured based on the current project's settings,
   * specifically the number of measures per bar and beats per measure.
   *
   * @return {void} Does not return a value.
   */
  addEmptyRow(): void {
    this.store.dispatch(ProjectActions.addEmptyRow({measuresPerBar: this.project.configuration.measuresPerBar, beatsPerMeasure: this.project.configuration.beatsPerMeasure}));
  }


  deleteRow(rowIndex: number): void {
    const newRows: Row[] = [];
    for (let i=0; i<this.project.rows.length; i++) {
      if (i !== rowIndex) {
        newRows.push(this.project.rows[i].clone());
      }
    }
    this.store.dispatch(ProjectActions.updateRows({rows: newRows}));
  }


}

