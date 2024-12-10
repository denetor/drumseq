import {Injectable} from '@angular/core';
import {Project} from '../../core/models/project.class';
import {Row} from '../../core/models/row.class';
import {Measure} from '../../core/models/measure.class';
import {Beat} from '../../core/models/beat.class';
import {Quarter} from '../../core/models/quarter.class';
import {Note} from '../../core/models/note.class';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';

@Injectable()
export class ProjectService {


  /**
   * Creates a new Project instance from a plain object.
   *
   * @param {Object} p - A plain object that contains the properties to be copied into the new Project instance.
   * @return {Project} The newly created Project instance.
   */
  public static fromObject(p: any): Project {
    const project = new Project();
    project.name = p?.name || 'untitled';
    project.configuration = ProjectConfiguration.fromObject(p?.configuration);
    project.rows = [];
    for (const row of p.rows) {
      const newRow = new Row();
      newRow.measures = [];
      for (const measure of row.measures) {
        const newMeasure = new Measure();
        newMeasure.repetitions = measure.repetitions;
        newMeasure.beats = [];
        for (const beat of measure.beats) {
          const newBeat = new Beat();
          newBeat.quarters = [];
          for (const quarter of beat.quarters) {
            const newQuarter = new Quarter();
            newQuarter.notes = [];
            for (const note of quarter.notes) {
              const newNote = new Note(note.instrument, note.accent);
              newQuarter.notes.push(newNote);
            }
            newBeat.quarters.push(newQuarter);
          }
          newMeasure.beats.push(newBeat);
        }
        newRow.measures.push(newMeasure);
      }
      project.rows.push(newRow);
    }
    return project;
  }

}
