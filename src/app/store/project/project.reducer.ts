import {Project} from '../../core/models/project.class';
import {ProjectActions} from './project.actions';
import {createReducer, on} from '@ngrx/store';
import {ProjectService} from './project.service';

export interface IProjectState {
  project: Project;
}

export const initialState: IProjectState = {
  project: new Project(),
};

export const projectReducer = createReducer(
  initialState,


  on(ProjectActions['import'], (state: IProjectState, action) => {
    return {project: ProjectService.fromObject(action.project)};
  }),


  on(ProjectActions['updateName'], (state: IProjectState, action) => {
    const newProject = state.project.clone();
    newProject.name = action.name;
    return {project: newProject};
  }),


  on(ProjectActions['updateRows'], (state: IProjectState, action) => {
    const newProject = state.project.clone();
    newProject.rows = [];
    for (const row of action.rows) {
      newProject.rows.push(row.clone());
    }
    return {project: newProject};
  }),

);
