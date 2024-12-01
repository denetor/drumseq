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


  clone(): Project {
    const clonedProject = new Project();
    clonedProject.name = this.name;
    clonedProject.configuration = this.configuration.clone();
    clonedProject.rows = this.rows.map(row => row.clone());
    return clonedProject;
  }


  replaceMeasure(rowIndex: number, measureIndex: number, measure: Measure): void {
    console.log(`Project.replaceMeasure(${rowIndex}, ${measureIndex})`);
    console.log('existing measure:');
    console.log(this.rows[rowIndex].measures[measureIndex]);
    console.log('new measure:');
    console.log(measure);
    const newMeasures: Measure[] = [];
    for (let i = 0; i < this.rows[rowIndex].measures.length; i++) {
      if (i !== measureIndex) {
        newMeasures.push(this.rows[rowIndex].measures[i]);
      } else {
        newMeasures.push(measure.clone());
      }
    }
    this.rows[rowIndex].measures = newMeasures;
  }

}
