import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {Beat} from '../../core/models/beat.class';
import {Quarter} from '../../core/models/quarter.class';
import {Instrument} from '../../core/models/instrument.enum';

@Component({
  selector: 'app-tab-viewer-quarter',
  template: `
      <div class="inline">
        {{ noteSymbol(Instrument.HAT) }}<br />
        {{ noteSymbol(Instrument.SNARE) }}<br />
        {{ noteSymbol(Instrument.BASS) }}<br />
        {{ index + 1 }}
      </div>
  `,
  standalone: true,
  imports: [
    NgForOf
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerQuarterComponent implements OnInit {
  @Input() quarter: Quarter;
  @Input() index: number = 1;

  constructor() {
    this.quarter = new Quarter();
  }

  ngOnInit() {
    // this.quarter = new Quarter();
  }

  noteSymbol(instrument: Instrument): string {
    for (const note of this.quarter.notes) {
      if (note.instrument === instrument) {
        return note.tabSymbol();
      }
    }
    return '-';
  }

  protected readonly Instrument = Instrument;
}
