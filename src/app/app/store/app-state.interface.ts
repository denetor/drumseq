import {Project} from '../core/models/project.class';
import {ActionReducerMap} from '@ngrx/store';
import * as fromProject from './../store/project/project.reducer';
import {projectReducer} from './project/project.reducer';

export interface IAppState {
  project: fromProject.IProjectState;
}


export const reducers:ActionReducerMap<IAppState> = {
  project: projectReducer,
};
