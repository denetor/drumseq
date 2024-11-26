import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';
import {interval, Observable, of, Subject, Subscription} from 'rxjs';
import {PlayStatus} from '../core/models/play-status.class';
import {Instrument} from '../core/models/instrument.enum';
import {FormsModule} from '@angular/forms';
import {JsonExportComponent} from '../components/json-export/json-export.component';
import {JsonPipe} from '@angular/common';
import {Row} from '../core/models/row.class';
import {Measure} from '../core/models/measure.class';
import {Beat} from '../core/models/beat.class';
import {Quarter} from '../core/models/quarter.class';
import {IAppState} from '../store/app-state.interface';
import {Store} from '@ngrx/store';
import {IProjectState} from '../store/project/project.reducer';
import {ProjectActions} from '../store/project/project.actions';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    TabViewerComponent,
    FormsModule,
    JsonExportComponent,
    JsonPipe
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  project: Project;
  projectState$: Observable<IProjectState>;
  beatQuarter$: Observable<number>;
  beatQuarterSubscription: Subscription;
  playStatus: PlayStatus;
  metronomeClick: any;
  metronomeClickMeasure: any;
  instruments: any[] = [];

  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.project = new Project();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.beatQuarter$ = new Observable();
    this.beatQuarterSubscription = new Subscription();
    this.playStatus = new PlayStatus();
  }

  ngOnInit() {
    this.project = new Project();

    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.project = projectState.project;
      })
    );

    this.metronomeClick = new Audio('/samples/metronome-click-0.mp3');
    this.metronomeClickMeasure = new Audio('/samples/metronome-click-1.mp3');
    this.metronomeClick.load();
    this.metronomeClickMeasure.load();

    // load sounds
    this.instruments[Instrument.BASS] = new Audio('/samples/set0/kick.mp3');
    this.instruments[Instrument.SNARE] = new Audio('/samples/set0/snare.mp3');
    this.instruments[Instrument.HAT] = new Audio('/samples/set0/hi-hat.mp3');
  }

  ngOnDestroy() {
    this.stop();
    this.subscription.unsubscribe();
    this.beatQuarterSubscription.unsubscribe();
  }


  play() {
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


  stop() {
    this.beatQuarterSubscription.unsubscribe();
    this.unEnhanceBeat(this.playStatus);
    this.metronomeClick.pause();
    this.playStatus.playing = false;
  }


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


  enhanceBeat(status: PlayStatus) {
    const beat = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat);
    if (beat) {
      beat.style.backgroundColor = '#ffffaa';
    }
  }


  unEnhanceBeat(status: PlayStatus) {
    const beat = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat);
    if (beat) {
      beat.style.backgroundColor = '#ffffff';
    }
  }


  metronome(status: PlayStatus) {
    if (status.metronome && status.beat === this.project.configuration.beatsPerMeasure -1 && status.quarter === 0) {
      this.metronomeClickMeasure.currentTime = 0;
      this.metronomeClickMeasure.cloneNode(true).play();
    } else if (status.metronome && status.quarter === 0) {
      this.metronomeClick.currentTime = 0;
      this.metronomeClick.cloneNode(true).play();
    }
  }


  toggleMetronome() {
    this.playStatus.metronome = !this.playStatus.metronome;
  }


  playBeat(status: PlayStatus) {
    const notes = this.project.rows[status.row].measures[status.measure].beats[status.beat].quarters[status.quarter].notes;
    if (notes && notes.length) {
      notes.forEach((note) => {
        try {
          this.instruments[note.instrument].cloneNode(true).play();
        } catch (e) {}
      });
    }
  }


  importProject(project: Project) {
    this.store.dispatch(ProjectActions.import({project: project}));
  }

}
