import { Reducer } from 'redux';
import { SemesterAction, SemesterActionType, SemesterState } from './types';

const initialState: SemesterState = {
  isFetching: false,
  semesters: []
};
const semesterReducer: Reducer<SemesterState, SemesterAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SemesterActionType.SEMESTER_ACTION_PENDING:
      return { ...state, isFetching: true };
    case SemesterActionType.SEMESTER_ACTION_FAILURE:
    case SemesterActionType.CREATE_SEMESTER_SUCCESS:
    case SemesterActionType.UPDATE_SEMESTER_SUCCESS:
    case SemesterActionType.DELETE_SEMESTER_SUCCESS:
      return { ...state, isFetching: false };
    case SemesterActionType.GET_ALL_SEMESTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        semesters: action.payload
      };
    default:
      return state;
  }
};

export default semesterReducer;
