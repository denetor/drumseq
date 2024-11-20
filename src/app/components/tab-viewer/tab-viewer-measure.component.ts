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
      <app-tab-viewer-beat [beat]="beat" [index]="i" class="inline"></app-tab-viewer-beat>
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

  constructor() {
    this.measure = new Measure();
  }

  ngOnInit() {
    // this.measure = new Measure();
  }
}
