import {Note} from './note.class';

export class Quarter {
  notes: Note[];

  constructor() {
    this.notes = [];
  }

  clone(): Quarter {
    const clonedNotes: Note[] = this.notes.map(note => note.clone());
    const clonedQuarter = new Quarter();
    clonedQuarter.notes = clonedNotes;
    return clonedQuarter;
  }
}
