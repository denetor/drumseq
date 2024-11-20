import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {JsonPipe, NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {TabViewerMeasureComponent} from './tab-viewer-measure.component';

@Component({
  selector: 'app-tab-viewer-row',
  template: `
    <div class="row">
      <div class="inline">
        HH | <br />
        SD | <br />
        BD | <br />
        __ |
      </div>
      <div *ngFor="let measure of row.measures" class="inline">
        <app-tab-viewer-measure [measure]="measure"></app-tab-viewer-measure>
      </div>
    </div>
    <div>
      <br>
      {{ row | json }}
    </div>
  `,
  styles: [`
    .row
      font-family: monospace
    .inline
      display: inline-block
  `],
  standalone: true,
  imports: [
    NgForOf,
    TabViewerMeasureComponent,
    JsonPipe
  ],
  // templateUrl: './tab-viewer.component.html',
  // styleUrls: ['./tab-viewer.component.css']
})
export class TabViewerRowComponent implements OnInit {
  @Input() row: Row;

  constructor() {
    this.row = new Row();
  }

  ngOnInit() {
    // this.row = new Row();
  }
}
