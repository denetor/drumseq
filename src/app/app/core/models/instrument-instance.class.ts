import {Instrument} from './instrument.enum';

export class InstrumentInstance {
  type: Instrument;
  element: HTMLAudioElement;
  source: MediaElementAudioSourceNode;

  constructor(type: Instrument, context: AudioContext, resource: string) {
    this.type = type;
    this.element = new Audio(resource);
    this.source = context.createMediaElementSource(this.element);
    this.source.connect(context.destination);
  }

  async play(): Promise<void> {
    this.element.currentTime = 0;
    return this.element.play();
  }
}
