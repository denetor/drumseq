import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';
import {interval, Observable, Subscription, take} from 'rxjs';
import {PlayStatus} from '../core/models/play-status.class';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    TabViewerComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.sass'
})
export class PlayerComponent implements OnInit, OnDestroy {
  project: Project;
  beatQuarter$: Observable<number>;
  beatQuarterSubscription: Subscription;
  playStatus: PlayStatus;
  metronomeClick: any;
  metronomeClickMeasure: any;

  constructor() {
    this.project = new Project();
    this.beatQuarter$ = new Observable();
    this.beatQuarterSubscription = new Subscription();
    this.playStatus = new PlayStatus();
  }

  ngOnInit() {
    this.project = new Project();
    this.metronomeClick = new Audio('/samples/metronome-click-0.mp3');
    this.metronomeClickMeasure = new Audio('/samples/metronome-click-1.mp3');
    this.metronomeClick.load();
    this.metronomeClickMeasure.load();

  }

  ngOnDestroy() {
    this.stop();
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
    // const quarter = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat + '-quarter-' + status.quarter);
    // if (quarter) {
    //   quarter.style.backgroundColor = '#ffffaa';
    // }
  }


  unEnhanceBeat(status: PlayStatus) {
    const beat = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat);
    if (beat) {
      beat.style.backgroundColor = '#ffffff';
    }
    // const quarter = document.getElementById('row-' + status.row + '-measure-' + status.measure + '-beat-' + status.beat + '-quarter-' + status.quarter);
    // if (quarter) {
    //   quarter.style.backgroundColor = '#ffffaa';
    // }
  }

  metronome(status: PlayStatus) {
    if (status.metronome && status.beat === this.project.configuration.beatsPerMeasure -1 && status.quarter === 0) {
      this.metronomeClickMeasure.play();
    } else if (status.metronome && status.quarter === 0) {
      this.metronomeClick.play();
    }
  }


  toggleMetronome() {
    this.playStatus.metronome = !this.playStatus.metronome;
  }

}
