import {createActionGroup, props} from '@ngrx/store';
import {Project} from '../../core/models/project.class';
import {Row} from '../../core/models/row.class';

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    'import': props<{project: Project}>(),
    'updateName': props<{name: string}>(),
    'addEmptyRow': props<{measuresPerBar: number, beatsPerMeasure: number}>(),
    'updateRows': props<{rows: Row[]}>(),
  }
});
