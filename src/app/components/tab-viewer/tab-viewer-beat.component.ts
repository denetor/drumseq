import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {NgForOf} from '@angular/common';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {Beat} from '../../core/models/beat.class';

@Component({
  selector: 'app-tab-viewer-beat',
  template: `
    <div class="inline">
      ----| <br />
      ----| <br />
      ----| <br />
      {{ index + 1 }} + |
    </div>
  `,
  standalone: true,
  imports: [
    NgForOf
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
    this.beat = new Beat();
  }
}
