import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Measure} from '../../core/models/measure.class';
import {TabViewerBeatComponent} from './tab-viewer-beat.component';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {Instrument} from '../../core/models/instrument.enum';
import {NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {IProjectState} from '../../store/project/project.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';
import {IEditMeasureRequest} from '../../core/models/edit-measure-request.interface';
import {Row} from '../../core/models/row.class';

@Component({
  selector: 'app-tab-viewer-measure',
  template: `
    <div>
      @for(beat of measure.beats; track beat; let i = $index) {
        <app-tab-viewer-beat
          class="inline"
          id="row-{{rowIndex}}-measure-{{measureIndex}}-beat-{{i}}"
          [beat]="beat"
          [rowIndex]="rowIndex"
          [measureIndex]="measureIndex"
          [beatIndex]="i"
          [projectConfiguration]="projectConfiguration"
        ></app-tab-viewer-beat>
      }
      <div class="inline">
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HAT)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HI_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.MID_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.FLOOR_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.SNARE)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.BASS)">|<br/></span>
        |
      </div>
    </div>
    <div>
      <button (click)="emitEdit()">Edit</button>
      <button (click)="emitCopy()">Copy</button>
      <button *ngIf="clipboardMeasure" (click)="emitPaste()">Paste</button>
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerBeatComponent,
    NgIf,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerMeasureComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected readonly Instrument = Instrument;
  projectState$: Observable<IProjectState>;
  @Input() measure: Measure;
  @Input() rowIndex: number;
  @Input() measureIndex: number;
  @Input() projectConfiguration: ProjectConfiguration;
  @Input() clipboardMeasure: Measure | undefined = undefined;
  @Output() edit = new EventEmitter<IEditMeasureRequest>();
  @Output() copy = new EventEmitter<Measure>();
  @Output() paste = new EventEmitter<{rowIndex: number, measureIndex: number}>();


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.measure = new Measure();
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.rowIndex = 0;
    this.measureIndex = 0;
  }


  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.projectConfiguration = projectState?.project?.configuration ?? ProjectConfiguration.getDefault();
      })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  emitEdit() {
    this.edit.emit({
      rowIndex: this.rowIndex,
      measureIndex: this.measureIndex,
      measure: this.measure,
    });
  }


  emitCopy(): void {
    this.copy.emit(this.measure);
  }


  emitPaste(): void {
    this.paste.emit({rowIndex: this.rowIndex, measureIndex: this.measureIndex});
  }

}
