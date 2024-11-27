import {InstrumentInstance} from './instrument-instance.class';
import {Instrument} from './instrument.enum';

export class InstrumentsSet {
  context: AudioContext;
  instruments: InstrumentInstance[] = [];

  constructor(context: AudioContext) {
    this.context = context;
  }

  load(set: string) {
    this.instruments.push(new InstrumentInstance(Instrument.METRONOME, this.context, `/samples/metronome-click-0.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.METRONOME_HI, this.context, `/samples/metronome-click-1.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.BASS, this.context, `/samples/${set}/kick.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.SNARE, this.context, `/samples/${set}/snare.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.HAT, this.context, `/samples/${set}/hi-hat.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.HI_TOM, this.context, `/samples/${set}/tom-1.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.MID_TOM, this.context, `/samples/${set}/tom-2.mp3`));
    this.instruments.push(new InstrumentInstance(Instrument.FLOOR_TOM, this.context, `/samples/${set}/floor-tom.mp3`));
  }

  play(instrumentType: Instrument, accent: boolean = false) {
    const instrument: InstrumentInstance | undefined = this.instruments.find(i => i.type === instrumentType);
    if (instrument && instrument.element) {
      instrument.element.currentTime = 0;
      instrument.element.play().then();
    }
  }
}
