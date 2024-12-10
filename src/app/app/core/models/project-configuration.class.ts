import {Instrument} from './instrument.enum';

export class ProjectConfiguration {
  static DEFAULT_BPM = 100;
  static DEFAULT_MEASURES_PER_BAR = 4;
  static DEFAULT_BEATS_PER_MEASURE = 4;

  bpm: number;
  measuresPerBar: number;
  beatsPerMeasure: number;
  visibleInstruments: Instrument[] = [];

  constructor(bpm: number, measuresPerBar: number, beatsPerMeasure: number) {
    this.bpm = bpm;
    this.measuresPerBar = measuresPerBar;
    this.beatsPerMeasure = beatsPerMeasure;
  }

  clone(): ProjectConfiguration {
    const c = new ProjectConfiguration(
      this.bpm,
      this.measuresPerBar,
      this.beatsPerMeasure,
    );
    c.visibleInstruments = [...this.visibleInstruments];
    return c;
  }


  isVisibleInstrument(type: Instrument): boolean {
    return this.visibleInstruments.includes(type);
  }


  static getDefault(): ProjectConfiguration {
    const c = new ProjectConfiguration(
      ProjectConfiguration.DEFAULT_BPM,
      ProjectConfiguration.DEFAULT_MEASURES_PER_BAR,
      ProjectConfiguration.DEFAULT_BEATS_PER_MEASURE
    );
    c.visibleInstruments = [
      Instrument.HAT,
      Instrument.HI_TOM,
      Instrument.MID_TOM,
      Instrument.FLOOR_TOM,
      Instrument.SNARE,
      Instrument.BASS,
    ];
    return c;
  }


  static fromObject(o: any): ProjectConfiguration {
    const c = new ProjectConfiguration(
      o.bpm ?? ProjectConfiguration.DEFAULT_BPM,
      o.measuresPerBar ?? ProjectConfiguration.DEFAULT_MEASURES_PER_BAR,
      o.beatsPerMeasure ?? ProjectConfiguration.DEFAULT_BEATS_PER_MEASURE
    );
    c.visibleInstruments = [...(o.visibleInstruments ?? [])];
    return c;
  }

}
