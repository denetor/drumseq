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

  constructor() {
    this.project = new Project();
    this.beatQuarter$ = new Observable();
    this.beatQuarterSubscription = new Subscription();
    this.playStatus = new PlayStatus();
  }

  ngOnInit() {
    this.project = new Project();
  }

  ngOnDestroy() {
    this.beatQuarterSubscription.unsubscribe();
  }


  play() {
    this.playStatus = new PlayStatus();
    this.beatQuarter$ = interval(60000 / this.project.configuration.bpm / 4);
    this.beatQuarterSubscription = this.beatQuarter$.subscribe(
      (tick) => {
        this.playStatus = this.advanceTick(this.project, this.playStatus);
      }
    );
  }


  stop() {
    this.beatQuarterSubscription.unsubscribe();
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
}
