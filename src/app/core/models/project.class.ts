import {Row} from './row.class';
import {Note} from './note.class';
import {Instrument} from './instrument.enum';

export class Project {
  name: string;
  configuration: any;
  rows: Row[];

  constructor() {
    this.name = 'Untitled';
    this.configuration = {
      bpm: 90,
      measuresPerBar: 4,
      beatsPerMeasure: 4,
    };
    // this.rows = [];
    this.rows = [
      new Row(this.configuration.beatsPerMeasure, this.configuration.measuresPerBar),
      new Row(this.configuration.beatsPerMeasure, this.configuration.measuresPerBar),
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
  }


  clone(): Project {
    const clonedProject = new Project();
    clonedProject.name = this.name;
    clonedProject.configuration = { ...this.configuration };
    clonedProject.rows = this.rows.map(row => row.clone());
    return clonedProject;
  }

}
