import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {TabViewerRowComponent} from './tab-viewer-row.component';
import {Observable, of, Subscription} from 'rxjs';
import {IProjectState} from '../../store/project/project.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';
import {JsonPipe} from '@angular/common';
import {Measure} from '../../core/models/measure.class';
import {IEditMeasureRequest} from '../../core/models/edit-measure-request.interface';

@Component({
  selector: 'app-tab-viewer',
  template: `
    @if (project && project.rows) {
      @for(row of project.rows; track row; let i = $index) {
        <app-tab-viewer-row
          id="row-{{i}}"
          [row]="row"
          [rowIndex]="i"
          [projectConfiguration]="project.configuration"
          (editMeasure)="emitEditMeasure($event)"
        ></app-tab-viewer-row>
      }
    }
  `,
  standalone: true,
  imports: [
    TabViewerRowComponent,
    JsonPipe,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  project: Project | undefined;
  projectState$: Observable<IProjectState>;
  @Output() editMeasure = new EventEmitter<IEditMeasureRequest>();


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.project = undefined;
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
  }


  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.project = projectState.project;
      })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  emitEditMeasure(request: IEditMeasureRequest) {
    this.editMeasure.emit(request);
  }

}
