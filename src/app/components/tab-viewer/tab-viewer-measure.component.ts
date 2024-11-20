import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {JsonPipe, NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {TabViewerBeatComponent} from './tab-viewer-beat.component';

@Component({
  selector: 'app-tab-viewer-measure',
  template: `
    @for(beat of measure.beats; track beat; let i = $index) {
      <app-tab-viewer-beat [beat]="beat" [rowIndex]="rowIndex" [measureIndex]="measureIndex" [beatIndex]="i" class="inline" id="row-{{rowIndex}}-measure-{{measureIndex}}-beat-{{i}}"></app-tab-viewer-beat>
    }
    <div class="inline">
      |<br />
      |<br />
      |<br />
      |
    </div>
  `,
  standalone: true,
  imports: [
    NgForOf,
    TabViewerBeatComponent,
    JsonPipe
  ],
  styles: `
    .inline
      display: inline-block
  `,
  // templateUrl: './tab-viewer.component.html',
  // styleUrls: ['./tab-viewer.component.css']
})
export class TabViewerMeasureComponent implements OnInit {
  @Input() measure: Measure;
  @Input() rowIndex: number;
  @Input() measureIndex: number;

  constructor() {
    this.measure = new Measure();
    this.rowIndex = 0;
    this.measureIndex = 0;
  }

  ngOnInit() {
    // this.measure = new Measure();
  }
}
