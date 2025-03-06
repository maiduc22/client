import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { ISemester } from '@/types/models/ISemester';

export interface SemesterState {
  isFetching: boolean;
  semesters: ISemester[];
}

export enum SemesterActionType {
  SEMESTER_ACTION_PENDING = 'SEMESTER_ACTION_PENDING',
  SEMESTER_ACTION_FAILURE = 'SEMESTER_ACTION_FAILURE',

  GET_ALL_SEMESTER_SUCCESS = 'GET_ALL_SEMESTER_ACTION_SUCCESS',
  CREATE_SEMESTER_SUCCESS = 'CREATE_SEMESTER_SUCCESS',
  UPDATE_SEMESTER_SUCCESS = 'UPDATE_SEMESTER_SUCCESS',
  DELETE_SEMESTER_SUCCESS = 'DELETE_SEMESTER_SUCCESS'
}

export interface SemesterActionPending {
  type: SemesterActionType.SEMESTER_ACTION_PENDING;
}

export interface SemesterActionFailure {
  type: SemesterActionType.SEMESTER_ACTION_FAILURE;
}

export interface GetAllSemesterSuccess {
  type: SemesterActionType.GET_ALL_SEMESTER_SUCCESS;
  payload: ISemester[];
}

export interface CreateSemesterSuccess {
  type: SemesterActionType.CREATE_SEMESTER_SUCCESS;
}

export interface UpdateSemesterSuccess {
  type: SemesterActionType.UPDATE_SEMESTER_SUCCESS;
}

export interface DeleteSemesterSuccess {
  type: SemesterActionType.DELETE_SEMESTER_SUCCESS;
}

export type SemesterAction =
  | SemesterActionPending
  | SemesterActionFailure
  | GetAllSemesterSuccess
  | CreateSemesterSuccess
  | UpdateSemesterSuccess
  | DeleteSemesterSuccess;

export type SemesterThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  SemesterAction
>;
