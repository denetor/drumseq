import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';

@Component({
  selector: 'app-tab-viewer-measure',
  template: `
    [Measure]
  `,
  standalone: true,
  imports: [
    NgForOf
  ],
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
