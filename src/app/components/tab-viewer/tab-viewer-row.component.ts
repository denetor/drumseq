import {Component, Input, OnInit} from '@angular/core';
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
      @for(measure of row.measures; track measure; let i = $index) {
        <app-tab-viewer-measure class="inline" [measure]="measure" [rowIndex]="rowIndex" [measureIndex]="i" id="row-{{rowIndex}}-measure-{{i}}"></app-tab-viewer-measure>
      }
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerMeasureComponent,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerRowComponent implements OnInit {
  @Input() row: Row;
  @Input() rowIndex: number;

  constructor() {
    this.row = new Row();
    this.rowIndex = 0;
  }

  ngOnInit() {
    // this.row = new Row();
  }
}
