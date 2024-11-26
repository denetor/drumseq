import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';
import {interval, Observable, of, Subject, Subscription} from 'rxjs';
import {PlayStatus} from '../core/models/play-status.class';
import {Instrument} from '../core/models/instrument.enum';
import {FormsModule} from '@angular/forms';
import {JsonExportComponent} from '../components/json-export/json-export.component';
import {JsonPipe} from '@angular/common';
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
  audioContext: AudioContext;
  audioElements;
  audioSources;


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
    this.audioElements = {
      click: new Audio('/samples/metronome-click-0.mp3'),
      clickMeasure: new Audio('/samples/metronome-click-1.mp3'),
      bass: new Audio('/samples/set0/kick.mp3'),
      snare: new Audio('/samples/set0/snare.mp3'),
      hat: new Audio('/samples/set0/hi-hat.mp3'),
    };
    this.audioSources = {
      click: this.audioContext.createMediaElementSource(this.audioElements.click),
      clickMeasure: this.audioContext.createMediaElementSource(this.audioElements.clickMeasure),
      bass: this.audioContext.createMediaElementSource(this.audioElements.bass),
      snare: this.audioContext.createMediaElementSource(this.audioElements.snare),
      hat: this.audioContext.createMediaElementSource(this.audioElements.hat),
    };
    this.audioSources.click.connect(this.audioContext.destination);
    this.audioSources.clickMeasure.connect(this.audioContext.destination);
    this.audioSources.bass.connect(this.audioContext.destination);
    this.audioSources.snare.connect(this.audioContext.destination);
    this.audioSources.hat.connect(this.audioContext.destination);
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
      this.audioElements.clickMeasure.currentTime = 0;
      this.audioElements.clickMeasure.play();
    } else if (status.metronome && status.quarter === 0) {
      this.audioElements.click.currentTime = 0;
      this.audioElements.click.play();
    }
  }


  toggleMetronome() {
    this.playStatus.metronome = !this.playStatus.metronome;
  }


  playBeat(status: PlayStatus) {
    const notes = this.project.rows[status.row].measures[status.measure].beats[status.beat].quarters[status.quarter].notes;
    if (notes && notes.length) {
      notes.forEach((note) => {
        switch (note.instrument) {
          case Instrument.BASS:
            this.audioElements.bass.currentTime = 0;
            this.audioElements.bass.play();
            break;
          case Instrument.SNARE:
            this.audioElements.snare.currentTime = 0;
            this.audioElements.snare.play();
            break;
          case Instrument.HAT:
            this.audioElements.hat.currentTime = 0;
            this.audioElements.hat.play();
            break;
        }
      });
    }
  }


  importProject(project: Project) {
    this.store.dispatch(ProjectActions.import({project: project}));
  }

}

