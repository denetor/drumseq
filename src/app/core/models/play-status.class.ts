import {PlayStatusMode} from './play-status-mode.enum';
import {ProjectConfiguration} from './project-configuration.class';
import {Project} from './project.class';

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
  /**
   * The current playing mode to use
   */
  playMode: PlayStatusMode;

  constructor() {
    this.row = 0;
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.metronome = false;
    this.music = true;
    this.playing = false;
    this.playMode = PlayStatusMode.PlayProject;
  }


  setAtStart(mode: PlayStatusMode) {
    this.playMode = mode;
    switch (this.playMode) {
      case PlayStatusMode.PlayProject:
        this.setAtProjectStart();
        break;
      case PlayStatusMode.LoopRow:
        this.setAtRowStart();
        break;
      case PlayStatusMode.LoopMeasure:
        this.setAtMeasureStart();
        break;
    }
  }


  setAtProjectStart() {
    this.row = 0;
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.playing = true;
  }


  setAtRowStart() {
    this.measure = 0;
    this.beat = 0;
    this.quarter = -1;
    this.playing = true;
  }


  setAtMeasureStart() {
    this.beat = 0;
    this.quarter = -1;
    this.playing = true;
  }


  advanceTick(project: Project): void {
    this.quarter++;
    if (this.quarter >= 4) {
      this.quarter = 0;
      this.beat++;
    }
    if (this.beat >= project.configuration.beatsPerMeasure) {
      this.beat = 0;
      if (this.playMode !== PlayStatusMode.LoopMeasure) {
        this.measure++;
      }
    }
    if (this.measure >= project.configuration.measuresPerBar) {
      this.measure = 0;
      if (this.playMode !== PlayStatusMode.LoopRow) {
        this.row++;
      }
    }
    if (this.row >= project.rows.length) {
      if (this.playMode === PlayStatusMode.LoopRow) {
        this.row = 0;
      }
    }
  }
}
