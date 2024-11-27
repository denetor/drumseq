export class ProjectConfiguration {
  static DEFAULT_BPM = 120;
  static DEFAULT_MEASURES_PER_BAR = 4;
  static DEFAULT_BEATS_PER_MEASURE = 4;

  bpm: number;
  measuresPerBar: number;
  beatsPerMeasure: number;

  clone(): ProjectConfiguration {
    return new ProjectConfiguration(
      this.bpm,
      this.measuresPerBar,
      this.beatsPerMeasure
    );
  }

  static getDefault(): ProjectConfiguration {
    return new ProjectConfiguration(
      ProjectConfiguration.DEFAULT_BPM,
      ProjectConfiguration.DEFAULT_MEASURES_PER_BAR,
      ProjectConfiguration.DEFAULT_BEATS_PER_MEASURE
    );
  }

  constructor(bpm: number, measuresPerBar: number, beatsPerMeasure: number) {
    this.bpm = bpm;
    this.measuresPerBar = measuresPerBar;
    this.beatsPerMeasure = beatsPerMeasure;
  }
}
