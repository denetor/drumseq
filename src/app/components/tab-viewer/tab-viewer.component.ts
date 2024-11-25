import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {TabViewerRowComponent} from './tab-viewer-row.component';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-tab-viewer',
  template: `
    @if (project) {
      @for(row of project.rows; track row; let i = $index) {
        <app-tab-viewer-row [row]="row" [rowIndex]="i" id="row-{{i}}"></app-tab-viewer-row>
      }
    }
  `,
  standalone: true,
  imports: [
    TabViewerRowComponent,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  // @Input() project: Project;
  project: Project | undefined;
  @Input() project$: Observable<Project>;

  constructor() {
    this.project = undefined;
    this.project$ = new Observable();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(this.project$.subscribe(project => {
      console.log('Project update in tab-viewer-component detected:');
      console.log({project});
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
