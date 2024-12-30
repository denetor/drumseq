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
import {Row} from '../../core/models/row.class';
import {TabViewerMeasureComponent} from './tab-viewer-measure.component';
import {MatButtonModule} from '@angular/material/button';

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
          [clipboardRow]="clipboardRow"
          [clipboardMeasure]="clipboardMeasure"
          (editMeasure)="emitEditMeasure($event)"
          (copyMeasure)="emitCopyMeasure($event)"
          (pasteMeasure)="emitPasteMeasure($event)"
          (deleteRow)="emitDeleteRow($event)"
          (copyRow)="emitCopyRow($event)"
          (pasteRow)="emitPasteRow($event)"
          (playRow)="emitPlayRow($event)"
        ></app-tab-viewer-row>
      }
    }
    <div class="m-t-2rem">
      <button mat-raised-button (click)="emitAddRow()">Add row</button>
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerRowComponent,
    TabViewerMeasureComponent,
    MatButtonModule,
  ],
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  project: Project | undefined;
  projectState$: Observable<IProjectState>;
  @Input() clipboardRow: Row | undefined = undefined;
  @Input() clipboardMeasure: Measure | undefined = undefined;
  @Output() editMeasure = new EventEmitter<IEditMeasureRequest>();
  @Output() copyMeasure = new EventEmitter<Measure>();
  @Output() pasteMeasure = new EventEmitter<{rowIndex: number, measureIndex: number}>();
  @Output() addRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter<number>();
  @Output() copyRow = new EventEmitter<Row>();
  @Output() pasteRow = new EventEmitter<number>();
  @Output() playRow = new EventEmitter<number>();


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


  emitCopyMeasure(measure: Measure): void {
    this.copyMeasure.emit(measure);
  }


  emitPasteMeasure(pasteRequest: {rowIndex: number, measureIndex: number}): void {
    this.pasteMeasure.emit(pasteRequest);
  }


  emitAddRow() {
    this.addRow.emit();
  }


  emitDeleteRow(rowIndex: number) {
      this.deleteRow.emit(rowIndex);
  }


  emitCopyRow(row: Row) {
    this.copyRow.emit(row);
  }


  emitPasteRow(rowIndex: number) {
    this.pasteRow.emit(rowIndex);
  }


  emitPlayRow(rowIndex: number) {
    this.playRow.emit(rowIndex);
  }


}
