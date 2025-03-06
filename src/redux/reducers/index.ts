import { Reducer, combineReducers } from 'redux';
import unitReducer from './unit/unit.reducer';
import userReducer from './user/user.reducer';
import roleReducer from './role/role.reducer';
import permissionReducer from './permission/permission.reducer';
import subjectReducer from './subject/reducer';
import semesterReducer from './semester/reducer';

const rootReducer = combineReducers({
  unit: unitReducer,
  user: userReducer,
  role: roleReducer,
  permission: permissionReducer,
  subject: subjectReducer,
  semester: semesterReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
