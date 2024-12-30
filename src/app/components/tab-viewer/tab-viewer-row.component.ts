import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Row} from '../../core/models/row.class';
import {TabViewerMeasureComponent} from './tab-viewer-measure.component';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {Instrument} from '../../core/models/instrument.enum';
import {JsonPipe, NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {IProjectState} from '../../store/project/project.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';
import {Measure} from '../../core/models/measure.class';
import {IEditMeasureRequest} from '../../core/models/edit-measure-request.interface';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tab-viewer-row',
  template: `
    <div class="row">
      <div class="inline">
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HAT)">HH |<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HI_TOM)">HT |<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.MID_TOM)">MT |<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.FLOOR_TOM)">FT |<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.SNARE)">SD |<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.BASS)">BD |<br/></span>
        __ |<br/>
        __ |<br/>
      </div>
      @for(measure of row.measures; track measure; let i = $index) {
        <app-tab-viewer-measure
          class="inline"
          id="row-{{rowIndex}}-measure-{{i}}"
          [measure]="measure"
          [rowIndex]="rowIndex"
          [measureIndex]="i"
          [projectConfiguration]="projectConfiguration"
          [clipboardMeasure]="clipboardMeasure"
          (edit)="emitEditMeasure($event)"
          (copy)="emitCopyMeasure($event)"
          (paste)="emitPasteMeasure($event)"
        ></app-tab-viewer-measure>
      }
      <div class="inline">
        <button mat-raised-button (click)="emitDeleteRow(rowIndex)">Delete bar</button>
        <button mat-raised-button (click)="emitCopyRow()">Copy to clipboard</button>
        <button mat-raised-button *ngIf="clipboardRow" (click)="emitPasteRow()">Paste from clipboard</button>
        <button mat-raised-button (click)="emitPlayRow(rowIndex)">Loop play</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerMeasureComponent,
    NgIf,
    JsonPipe,
    MatButtonModule,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerRowComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected readonly Instrument = Instrument;
  projectState$: Observable<IProjectState>;
  @Input() row: Row;
  @Input() rowIndex: number;
  @Input() projectConfiguration: ProjectConfiguration;
  @Input() clipboardRow: Row | undefined = undefined;
  @Input() clipboardMeasure: Measure | undefined = undefined;
  @Output() editMeasure = new EventEmitter<IEditMeasureRequest>();
  @Output() copyMeasure = new EventEmitter<Measure>();
  @Output() pasteMeasure = new EventEmitter<{rowIndex: number, measureIndex: number}>();
  @Output() deleteRow = new EventEmitter<number>();
  @Output() copyRow = new EventEmitter<Row>();
  @Output() pasteRow = new EventEmitter<number>();
  @Output() playRow = new EventEmitter<number>();

  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.row = new Row();
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.rowIndex = 0;
  }

  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.projectConfiguration = projectState.project.configuration;
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


  emitDeleteRow(rowIndex: number): void {
    this.deleteRow.emit(rowIndex);
  }


  emitCopyRow(): void {
    this.copyRow.emit(this.row);
  }


  emitPasteRow(): void {
    this.pasteRow.emit(this.rowIndex);
  }


  emitPlayRow(rowIndex: number): void {
    this.playRow.emit(rowIndex);
  }


}
