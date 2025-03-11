/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { LoginPayload } from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import { createContext, useCallback, useReducer } from 'react';
import { AuthAction, AuthActionType } from './action';
import { saveToken } from '@/utils/token';
import { IUser, IUserRole } from '@/types/models/IUser';
import jwtDecode from 'jwt-decode';

export interface Authorities {
  userId: string;
  isRoot: boolean;
  grantedPermissions: string[];
}

const initialState = {
  isFetching: false,
  fullname: localStorage.getItem('fullname') || '',
  role: (localStorage.getItem('role') as IUserRole) || IUserRole.STUDENT,
  className: localStorage.getItem('className') || '',
  id: localStorage.getItem('id') || ''
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true };
    case AuthAction.AUTH_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case AuthAction.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fullname: action.payload.fullname,
        role: action.payload.role,
        className: action.payload.className,
        id: action.payload.id
      };
    case AuthAction.LOGOUT:
      return {
        ...state,
        isFetching: false,
        fullname: '',
        role: IUserRole.STUDENT,
        className: '',
        id: ''
      };
    default:
      return state;
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state);

  const login = async (payload: LoginPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.login();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const token = response.data.token;
      saveToken(token);
      const decodedToken = jwtDecode(token) as {
        id: string;
        username: string;
        Role: IUserRole;
        fullname: string;
        ClassName: string;
        exp: number;
        iss: string;
        aud: string;
      };
      localStorage.setItem('role', decodedToken.Role);
      localStorage.setItem('fullname', decodedToken.fullname);
      localStorage.setItem('className', decodedToken.ClassName);
      localStorage.setItem('id', decodedToken.id);
      dispatch({
        type: AuthAction.LOGIN_SUCCESS,
        payload: {
          fullname: decodedToken.fullname,
          role: decodedToken.Role,
          className: decodedToken.ClassName,
          id: decodedToken.id
        }
      });
      renderNotification('Đăng nhập thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification('Đăng nhập thất bại', NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const logout = async () => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });
    dispatch({ type: AuthAction.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
    renderNotification('Đăng xuất thành công', NotiType.SUCCESS);
  };

  return {
    state,
    login,
    logout
  };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  logout: async () => {}
});

interface Props {
  children: React.ReactNode | string;
}

export const AuthProvider = ({ children }: Props) => {
  const authReducer = useAuthReducer();

  return (
    <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>
  );
};
