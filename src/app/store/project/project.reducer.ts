import {Project} from '../../core/models/project.class';
import {createReducer} from '@ngrx/store';

export interface IProjectState {
  project: Project;
}

export const initialState: IProjectState = {
  project: new Project(),
};

export const projectReducer = createReducer(
  initialState,
  // on(searchClientiSuccess, (state: ClientiState, action) => {
  //   console.log('clientiReducer.on.searchClientiSuccess');
  //   // const newState = JSON.parse(JSON.stringify(state));
  //   const newState = cloneDeep(state);
  //   newState.search.items = action.payload;
  //   return newState;
  // }),
);
