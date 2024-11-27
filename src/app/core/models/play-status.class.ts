export class PlayStatus {
  /**
   * The row being currently playing
   */
  row: number;
  /**
   * The measure being currently playing
   */
  measure: number;
  /**
   * The beat being currently playing
   */
  beat: number;
  /**
   * The quarter being currently playing
   */
  quarter: number;
  /**
   * Indicates whether the metronome is active or not.
   * The metronome is typically used to maintain a consistent tempo.
   * - `true`: The metronome is on.
   * - `false`: The metronome is off.
   */
  metronome: boolean;
  /**
   * Indicates whether the notes playing is active or not.
   * If false, no note sound is played.
   */
  music: boolean;
  /**
   * Indicates whether the player is currently playing the project
   */
  playing: boolean;

  constructor() {
    this.row = 0;
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.metronome = false;
    this.music = true;
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
