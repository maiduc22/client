import { IUser } from '@/types/models/IUser';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface UserState {
  isFetching: boolean;
  users: IUser[];
}

export enum UserActionType {
  USER_ACTION_PENDING = 'USER_ACTION_PENDING',
  USER_ACTION_FAILURE = 'USER_ACTION_FAILURE',

  GET_ALL_USER_SUCCESS = 'GET_ALL_USER_ACTION_SUCCESS',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS',
  POST_SCORES_SUCCESS = 'POST_SCORES_SUCCESS',
  DOWNLOAD_FILE_SUCCESS = 'DOWNLOAD_FILE_SUCCESS'
}

export interface UserActionPending {
  type: UserActionType.USER_ACTION_PENDING;
}

export interface UserActionFailure {
  type: UserActionType.USER_ACTION_FAILURE;
}

export interface GetAllUserSuccess {
  type: UserActionType.GET_ALL_USER_SUCCESS;
  payload: IUser[];
}

export interface CreateUserSuccess {
  type: UserActionType.CREATE_USER_SUCCESS;
}

export interface UpdateUserSuccess {
  type: UserActionType.UPDATE_USER_SUCCESS;
}

export interface DeleteUserSuccess {
  type: UserActionType.DELETE_USER_SUCCESS;
}

export interface GetStudentsSuccess {
  type: UserActionType.GET_STUDENTS_SUCCESS;
  payload: IUser[];
}

export interface PostScoresSuccess {
  type: UserActionType.POST_SCORES_SUCCESS;
}

export interface DownloadFileSuccess {
  type: UserActionType.DOWNLOAD_FILE_SUCCESS;
  payload: Blob;
}

export type UserAction =
  | UserActionPending
  | UserActionFailure
  | GetAllUserSuccess
  | CreateUserSuccess
  | UpdateUserSuccess
  | DeleteUserSuccess
  | GetStudentsSuccess
  | PostScoresSuccess
  | DownloadFileSuccess;

export type UserThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  UserAction
>;
