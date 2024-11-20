import {Instrument} from './instrument.enum';

export class Note {
  instrument: Instrument;
  accent: boolean;

  constructor(instrument: Instrument, accent: boolean = false) {
    this.instrument = instrument;
    this.accent = accent ?? false;
  }

  tabSymbol(): string {
    return '-';
  }
}
