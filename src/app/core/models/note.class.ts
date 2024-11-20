import {Instrument} from './instrument.enum';

export class Note {
  instrument: Instrument;
  accent: boolean;

  constructor(instrument: Instrument, accent: boolean = false) {
    this.instrument = instrument;
    this.accent = accent ?? false;
  }

  tabSymbol(): string {
    switch (this.instrument) {
      case Instrument.CHINA:
      case Instrument.CRASH:
      case Instrument.HAT:
      case Instrument.OPEN_HAT:
      case Instrument.RIDE:
          return 'x';
      default:
        return 'o';
    }
  }
}
