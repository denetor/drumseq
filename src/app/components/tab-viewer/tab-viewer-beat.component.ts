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
      @for (quarter of beat.quarters; track quarter; let i = $index) {
        <app-tab-viewer-quarter [quarter]="quarter" [index]="beatIndex" id="row-{{rowIndex}}-measure-{{measureIndex}}-beat-{{beatIndex}}-quarter-{{i}}"></app-tab-viewer-quarter>
      }
      <div class="inline">
        | <br/>
        | <br/>
        | <br/>
        |
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerQuarterComponent,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerBeatComponent implements OnInit {
  @Input() beat: Beat;
  @Input() rowIndex: number;
  @Input() measureIndex: number;
  @Input() beatIndex: number;

  constructor() {
    this.beat = new Beat();
    this.rowIndex = 0;
    this.measureIndex = 0;
    this.beatIndex = 0;
  }

  ngOnInit() {
    // this.beat = new Beat();
  }
}
