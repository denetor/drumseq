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
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  /**
   * Determines if there is a note for a given instrument at the specified beat and quarter index.
   *
   * @param {number} beatIndex - The index of the beat within the measure.
   * @param {number} quarterIndex - The index of the quarter within the beat.
   * @param {Instrument} instrument - The instrument for which to check the presence of a note.
   * @return {boolean} Returns true if a note for the specified instrument exists at the given beat and quarter index, otherwise returns false.
   */
  hasNote(beatIndex: number, quarterIndex: number, instrument: Instrument): boolean {
    return this.measure.beats[beatIndex].quarters[quarterIndex].notes.some(note => note.instrument === instrument);
  }


  /**
   * Retrieves a specific note from a measure based on the provided beat index, quarter index, and instrument.
   *
   * @param {number} beatIndex - The index of the beat within the measure.
   * @param {number} quarterIndex - The index of the quarter within the beat.
   * @param {Instrument} instrument - The instrument used to find the specific note.
   * @return {Note} The note corresponding to the specified beat, quarter, and instrument.
   */
  getNote(beatIndex: number, quarterIndex: number, instrument: Instrument): Note {
    return this.measure.beats[beatIndex].quarters[quarterIndex].notes[
      this.measure.beats[beatIndex].quarters[quarterIndex].notes.findIndex(note => note.instrument === instrument)
      ];
  }


  /**
   * Adds a note to a specified beat and quarter within a measure for a given instrument.
   *
   * @param {number} beatIndex - The index of the beat in the measure where the note should be added.
   * @param {number} quarterIndex - The index of the quarter within the beat where the note should be added.
   * @param {Instrument} instrument - The instrument associated with the note to be added.
   * @return {void} This method does not return a value.
   */
  addNote(beatIndex: number, quarterIndex: number, instrument: Instrument): void {
    this.measure.beats[beatIndex].quarters[quarterIndex].notes.push(new Note(instrument));
  }


  /**
   * Toggles a note for a specified instrument at the given beat and quarter index.
   * If a note is present at the specified location, it will be removed.
   * If no note is present, a new note will be added.
   *
   * @param {number} beatIndex - The index of the beat within the measure where the note is to be toggled.
   * @param {number} quarterIndex - The index of the quarter within the beat where the note is to be toggled.
   * @param {Instrument} instrument - The instrument for which the note is to be toggled.
   * @return {void} This method does not return a value.
   */
  toggleNote(beatIndex: number, quarterIndex: number, instrument: Instrument): void {
    if (this.hasNote(beatIndex, quarterIndex, instrument)) {
      this.measure.beats[beatIndex].quarters[quarterIndex].notes.splice(
        this.measure.beats[beatIndex].quarters[quarterIndex].notes.findIndex(note => note.instrument === instrument),
        1
      );
    } else {
      this.addNote(beatIndex, quarterIndex, instrument);
    }
  }


  /**
   * Applies the current changes to the measure by emitting a save event
   * with the updated measure data if an editMeasureRequest is present.
   *
   * @return {void} This method does not return a value.
   */
  applyChanges(): void {
    if (this.editMeasureRequest) {
      this.save.emit({
        rowIndex: this.editMeasureRequest.rowIndex,
        measureIndex: this.editMeasureRequest.measureIndex,
        measure: this.measure,
      });
    }
  }


  /**
   * Cancels the current operation by emitting a save event with an undefined value.
   * This method is typically used to signal that no changes should be saved or processed.
   *
   * @return {void} Does not return any value.
   */
  cancel(): void {
    this.save.emit(undefined);
  }


  /**
   * Clears all notes within each quarter of every beat in the measure.
   * Resets the notes array to be empty for each quarter.
   *
   * @return {void} Does not return a value.
   */
  clear(): void {
    for (let i = 0; i < this.measure.beats.length; i++) {
      for (let j = 0; j < this.measure.beats[i].quarters.length; j++) {
        this.measure.beats[i].quarters[j].notes = [];
      }
    }
  }


}
