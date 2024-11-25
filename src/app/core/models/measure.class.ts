import {Beat} from './beat.class';

export class Measure {
  beats: Beat[];
  repetitions: number;

  constructor(beatsPerMeasure: number = 4) {
    this.beats = [];
    for (let i = 0; i < beatsPerMeasure; i++) {
      this.beats.push(new Beat());
    }
    this.repetitions = 1;
  }

  clone(): Measure {
    const clonedMeasure = new Measure();
    clonedMeasure.beats = this.beats.map(beat => beat.clone());
    clonedMeasure.repetitions = this.repetitions;
    return clonedMeasure;
  }

}
