import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {TabViewerBeatComponent} from './tab-viewer-beat.component';

@Component({
  selector: 'app-tab-viewer-measure',
  template: `
    @for(beat of measure.beats; track beat; let i = $index) {
      <app-tab-viewer-beat [index]="i" class="inline"></app-tab-viewer-beat>
    }
  `,
  standalone: true,
  imports: [
    NgForOf,
    TabViewerBeatComponent
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
    this.measure = new Measure();
  }
}
