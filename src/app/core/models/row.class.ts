import {Measure} from './measure.class';

export class Row {
  measures: Measure[];
  repetitions: number;

  constructor(measures: number = 4, beatsPerMeasure: number = 4) {
    this.measures = [];
    for (let i = 0; i < measures; i++) {
      this.measures.push(new Measure(beatsPerMeasure));
    }
    this.repetitions = 1;
  }
}
