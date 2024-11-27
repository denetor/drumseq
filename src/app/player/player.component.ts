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

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    EditMeasureComponent,
    TabViewerComponent,
    FormsModule,
    JsonExportComponent,
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
      this.instruments.play(Instrument.METRONOME_HI, false);
    } else if (status.metronome && status.quarter === 0) {
      this.instruments.play(Instrument.METRONOME, false);
    }
  }


  toggleMetronome() {
    this.playStatus.metronome = !this.playStatus.metronome;
  }

  toggleMusic() {
    this.playStatus.music = !this.playStatus.music;
  }


  playBeat(status: PlayStatus) {
    const notes = this.project.rows[status.row].measures[status.measure].beats[status.beat].quarters[status.quarter].notes;
    if (notes && notes.length && status.music) {
      notes.forEach((note) => {
        this.instruments.play(note.instrument, note.accent);
      });
    }
  }


  importProject(project: Project) {
    this.store.dispatch(ProjectActions.import({project: project}));
  }

}

