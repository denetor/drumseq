import {Measure} from './measure.class';

export interface IEditMeasureRequest {
  rowIndex: number;
  measureIndex: number;
  measure: Measure;
}
