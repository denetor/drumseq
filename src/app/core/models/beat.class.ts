import {Quarter} from './quarter.class';

export class Beat {
  quarters: Quarter[];


  constructor() {
    this.quarters = [];
    for (let i=0; i<4; i++) {
      this.quarters.push(new Quarter());
    }
  }
}
