import { Reducer } from 'redux';
import { SubjectAction, SubjectActionType, SubjectState } from './types';

const initialState: SubjectState = {
  isFetching: false,
  subjects: []
};
const subjectReducer: Reducer<SubjectState, SubjectAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SubjectActionType.SUBJECT_ACTION_PENDING:
      return { ...state, isFetching: true };
    case SubjectActionType.SUBJECT_ACTION_FAILURE:
    case SubjectActionType.CREATE_SUBJECT_SUCCESS:
    case SubjectActionType.UPDATE_SUBJECT_SUCCESS:
    case SubjectActionType.DELETE_SUBJECT_SUCCESS:
      return { ...state, isFetching: false };
    case SubjectActionType.GET_ALL_SUBJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        subjects: action.payload
      };
    default:
      return state;
  }
};

export default subjectReducer;
