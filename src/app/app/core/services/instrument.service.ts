import {Instrument} from '../models/instrument.enum';

export class InstrumentService {

  static getSymbol(instrument: Instrument): string {
    switch (instrument) {
      case (Instrument.HAT):
        return 'HH';
      case (Instrument.HI_TOM):
        return 'HT';
      case (Instrument.MID_TOM):
        return 'MT';
      case (Instrument.FLOOR_TOM):
        return 'FT';
      case (Instrument.SNARE):
        return 'SD';
      case (Instrument.BASS):
        return 'BD';
      default:
        return '';
    }
  }

}
