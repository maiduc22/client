import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { ISubject } from '@/types/models/ISubject';

export interface SubjectState {
  isFetching: boolean;
  subjects: ISubject[];
}

export enum SubjectActionType {
  SUBJECT_ACTION_PENDING = 'SUBJECT_ACTION_PENDING',
  SUBJECT_ACTION_FAILURE = 'SUBJECT_ACTION_FAILURE',

  GET_ALL_SUBJECT_SUCCESS = 'GET_ALL_SUBJECT_ACTION_SUCCESS',
  CREATE_SUBJECT_SUCCESS = 'CREATE_SUBJECT_SUCCESS',
  UPDATE_SUBJECT_SUCCESS = 'UPDATE_SUBJECT_SUCCESS',
  DELETE_SUBJECT_SUCCESS = 'DELETE_SUBJECT_SUCCESS'
}

export interface SubjectActionPending {
  type: SubjectActionType.SUBJECT_ACTION_PENDING;
}

export interface SubjectActionFailure {
  type: SubjectActionType.SUBJECT_ACTION_FAILURE;
}

export interface GetAllSubjectSuccess {
  type: SubjectActionType.GET_ALL_SUBJECT_SUCCESS;
  payload: ISubject[];
}

export interface CreateSubjectSuccess {
  type: SubjectActionType.CREATE_SUBJECT_SUCCESS;
}

export interface UpdateSubjectSuccess {
  type: SubjectActionType.UPDATE_SUBJECT_SUCCESS;
}

export interface DeleteSubjectSuccess {
  type: SubjectActionType.DELETE_SUBJECT_SUCCESS;
}

export type SubjectAction =
  | SubjectActionPending
  | SubjectActionFailure
  | GetAllSubjectSuccess
  | CreateSubjectSuccess
  | UpdateSubjectSuccess
  | DeleteSubjectSuccess;

export type SubjectThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  SubjectAction
>;
