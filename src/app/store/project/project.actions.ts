import {createActionGroup, props} from '@ngrx/store';
import {Project} from '../../core/models/project.class';

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    'import': props<{project: Project}>(),
    'updateName': props<{name: string}>(),
  }
});
