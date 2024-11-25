export class PlayStatus {
  row: number;
  measure: number;
  beat: number;
  quarter: number;
  metronome: boolean;
  playing: boolean;

  constructor() {
    this.row = 0;
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.metronome = false;
    this.playing = false;
  }

  setAtStart() {
    this.row = 0;
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.playing = true;
  }
}
