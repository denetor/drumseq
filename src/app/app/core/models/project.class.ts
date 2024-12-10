import {Row} from './row.class';
import {Note} from './note.class';
import {Instrument} from './instrument.enum';
import {ProjectConfiguration} from './project-configuration.class';
import {Measure} from './measure.class';

export class Project {
  name: string;
  configuration: ProjectConfiguration;
  rows: Row[];

  constructor() {
    this.name = 'Untitled';
    this.configuration = ProjectConfiguration.getDefault();
    // this.rows = [];
    this.rows = [
      new Row(this.configuration.measuresPerBar, this.configuration.beatsPerMeasure),
      new Row(this.configuration.measuresPerBar, this.configuration.beatsPerMeasure),
    ];
    this.rows[0].measures[0].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[0].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[0].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[0].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[0].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[0].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[0].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[1].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[1].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[1].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[1].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[1].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[1].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[2].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[2].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[2].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[2].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[2].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[2].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[3].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[3].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[3].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[0].measures[3].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[3].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[0].measures[3].beats[3].quarters[2].notes.push(new Note(Instrument.SNARE));
    this.rows[0].measures[1].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[0].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[0].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[0].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[0].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[0].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[0].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[1].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[1].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[1].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[1].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[1].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[1].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[2].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[2].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[2].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[2].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[2].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[2].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[0].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[0].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[3].beats[0].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[1].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[1].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[3].beats[1].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[2].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[2].quarters[0].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[3].beats[2].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[2].quarters[2].notes.push(new Note(Instrument.BASS));
    this.rows[1].measures[3].beats[3].quarters[0].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[3].quarters[0].notes.push(new Note(Instrument.SNARE));
    this.rows[1].measures[3].beats[3].quarters[2].notes.push(new Note(Instrument.HAT));
    this.rows[1].measures[3].beats[3].quarters[2].notes.push(new Note(Instrument.SNARE));
  }


  /**
   * Creates a deep copy of the current Project instance.
   * The cloning process involves making copies of the name, configuration, and rows properties to ensure that changes to the cloned instance do not affect the original instance.
   *
   * @return {Project} A new Project instance that is a deep clone of the current instance.
   */
  clone(): Project {
    const clonedProject = new Project();
    clonedProject.name = this.name;
    clonedProject.configuration = this.configuration.clone();
    clonedProject.rows = this.rows.map(row => row.clone());
    return clonedProject;
  }


  /**
   * Replaces a measure in a specific row with a new measure and returns the copy of the updated list of rows.
   *
   * @param {number} rowIndex - The index of the row where the measure should be replaced.
   * @param {number} measureIndex - The index of the measure within the specified row to be replaced.
   * @param {Measure} measure - The new measure to be inserted into the specified row and measure position.
   * @return {Row[]} An array of rows with the specified measure replaced at the given row and measure indices.
   */
  getRowsWithReplacedMeasure(rowIndex: number, measureIndex: number, measure: Measure): Row[] {
    const newRows = [];
    for (let i = 0; i < this.rows.length; i++) {
      if (i !== rowIndex) {
        newRows.push(this.rows[i]);
      } else {
        const newRow = new Row();
        newRow.measures = [];
        for (let j = 0; j < this.rows[rowIndex].measures.length; j++) {
          if (j !== measureIndex) {
            newRow.measures.push(this.rows[rowIndex].measures[j]);
          } else {
            newRow.measures.push(measure.clone());
          }
        }
        newRows.push(newRow);
      }
    }
    return newRows;
  }

}
