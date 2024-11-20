import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {JsonPipe, NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {Beat} from '../../core/models/beat.class';
import {TabViewerQuarterComponent} from './tab-viewer-quarter.component';

@Component({
  selector: 'app-tab-viewer-beat',
  template: `
    <div class="inline">
      @for(quarter of beat.quarters; track quarter; let i = $index) {
        <app-tab-viewer-quarter [quarter]="quarter" [index]="index"></app-tab-viewer-quarter>
      }
      <div class="inline">
      | <br />
      | <br />
      | <br />
      |
      </div>
    </div>
  `,
  styles: [`
    .inline
      display: inline-block
  `],
  standalone: true,
  imports: [
    NgForOf,
    TabViewerQuarterComponent,
    JsonPipe
  ],
  // templateUrl: './tab-viewer.component.html',
  // styleUrls: ['./tab-viewer.component.css']
})
export class TabViewerBeatComponent implements OnInit {
  @Input() beat: Beat;
  @Input() index: number = 1;

  constructor() {
    this.beat = new Beat();
  }

  ngOnInit() {
    // this.beat = new Beat();
  }
}
