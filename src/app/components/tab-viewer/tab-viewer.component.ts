import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {NgForOf} from '@angular/common';
import {TabViewerRowComponent} from './tab-viewer-row.component';

@Component({
  selector: 'app-tab-viewer',
  template: `
    <div *ngFor="let row of project.rows">
      <app-tab-viewer-row [row]="row"></app-tab-viewer-row>
    </div>
  `,
  standalone: true,
  imports: [
    NgForOf,
    TabViewerRowComponent
  ],
  // templateUrl: './tab-viewer.component.html',
  // styleUrls: ['./tab-viewer.component.css']
})
export class TabViewerComponent implements OnInit {
  @Input() project: Project;

  constructor() {
    this.project = new Project();
  }

  ngOnInit() {
    this.project = new Project();
  }
}
