import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';
import {interval, Observable, Subscription, take} from 'rxjs';

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

  constructor() {
    this.project = new Project();
    this.beatQuarter$ = new Observable();
    this.beatQuarterSubscription = new Subscription();
  }

  ngOnInit() {
    this.project = new Project();
  }

  ngOnDestroy() {
    this.beatQuarterSubscription.unsubscribe();
  }

  play() {
    this.beatQuarter$ = interval(60000 / this.project.configuration.bpm / 4);
    this.beatQuarterSubscription = this.beatQuarter$.subscribe(
      (beat) => {
        console.log(beat);
      }
    );
  }

  stop() {
    this.beatQuarterSubscription.unsubscribe();
  }
}
