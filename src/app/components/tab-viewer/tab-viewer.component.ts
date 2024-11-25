import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {TabViewerRowComponent} from './tab-viewer-row.component';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-tab-viewer',
  template: `
    @for(row of project.rows; track row; let i = $index) {
      <app-tab-viewer-row [row]="row" [rowIndex]="i" id="row-{{i}}"></app-tab-viewer-row>
    }
  `,
  standalone: true,
  imports: [
    TabViewerRowComponent,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerComponent implements OnInit {
  private subscription: Subscription;
  // @Input() project: Project;
  project: Project;
  @Input() project$: Observable<Project>;

  constructor() {
    this.project = new Project();
    this.project$ = new Observable();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.project = new Project();
    this.subscription.add(this.project$.subscribe(project => {
      this.project = project.clone();
    }));
  }
}
