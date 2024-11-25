import {Quarter} from './quarter.class';

export class Beat {
  quarters: Quarter[];


  constructor() {
    this.quarters = [];
    for (let i=0; i<4; i++) {
      this.quarters.push(new Quarter());
    }
  }

  clone(): Beat {
    const newBeat = new Beat();
    newBeat.quarters = this.quarters.map(quarter => quarter.clone());
    return newBeat;
  }
}
