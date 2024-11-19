import {Row} from './row.class';

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
    this.rows = [new Row(this.configuration.beatsPerMeasure, this.configuration.measuresPerBar)];
  }
}
