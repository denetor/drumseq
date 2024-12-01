import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';
import {IProjectState} from '../../store/project/project.reducer';
import {Measure} from '../../core/models/measure.class';
import {InstrumentService} from '../../core/services/instrument.service';
import {NgClass, NgIf} from '@angular/common';
import {Note} from '../../core/models/note.class';
import {Instrument} from '../../core/models/instrument.enum';
import {IEditMeasureRequest} from '../../core/models/edit-measure-request.interface';

@Component({
  selector: 'app-edit-measure',
  templateUrl: './edit-measure.component.html',
  styleUrls: ['./edit-measure.component.sass'],
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ]
})
export  class EditMeasureComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private projectState$: Observable<IProjectState>;
  protected readonly InstrumentService = InstrumentService;
  projectConfiguration: ProjectConfiguration;
  protected measure: Measure;
  @Input() editMeasureRequest: IEditMeasureRequest | undefined;
  @Output() save: EventEmitter<IEditMeasureRequest> = new EventEmitter();


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.measure = new Measure();
    this.editMeasureRequest = undefined;
  }


  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.projectConfiguration = projectState.project.configuration;
      })
    );

    this.measure = this.editMeasureRequest?.measure?.clone() ?? new Measure();

    // for test purposes
    // this.addNote(0,0, Instrument.HAT);
    // this.addNote(0,0, Instrument.SNARE);
    // this.addNote(0,2, Instrument.HAT);
    // this.addNote(1,0, Instrument.HAT);
    // this.addNote(1,0, Instrument.BASS);
    // this.addNote(1,2, Instrument.HAT);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  hasNote(beatIndex: number, quarterIndex: number, instrument: Instrument): boolean {
    return this.measure.beats[beatIndex].quarters[quarterIndex].notes.some(note => note.instrument === instrument);
  }


  getNote(beatIndex: number, quarterIndex: number, instrument: Instrument): Note {
    return this.measure.beats[beatIndex].quarters[quarterIndex].notes[
      this.measure.beats[beatIndex].quarters[quarterIndex].notes.findIndex(note => note.instrument === instrument)
      ];
  }


  addNote(beatIndex: number, quarterIndex: number, instrument: Instrument) {
    this.measure.beats[beatIndex].quarters[quarterIndex].notes.push(new Note(instrument));
  }


  toggleNote(beatIndex: number, quarterIndex: number, instrument: Instrument) {
    if (this.hasNote(beatIndex, quarterIndex, instrument)) {
      this.measure.beats[beatIndex].quarters[quarterIndex].notes.splice(
        this.measure.beats[beatIndex].quarters[quarterIndex].notes.findIndex(note => note.instrument === instrument),
        1
      );
    } else {
      this.addNote(beatIndex, quarterIndex, instrument);
    }
  }


  applyChanges(): void {
    if (this.editMeasureRequest) {
      this.save.emit({
        rowIndex: this.editMeasureRequest.rowIndex,
        measureIndex: this.editMeasureRequest.measureIndex,
        measure: this.editMeasureRequest.measure,
      });
    }
  }

  cancel(): void {
    this.save.emit(undefined);
  }


}
