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
import { IUser } from '@/types/models/IUser';

export interface Authorities {
  userId: string;
  isRoot: boolean;
  grantedPermissions: string[];
}

const initialState = {
  isFetching: false,
  user: null as IUser | null,
  authorities: null as Authorities | null,
  profile: null as IUser | null
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true };
    case AuthAction.AUTH_ACTION_FAILURE:
    case AuthAction.LOGIN_SUCCESS:
    case AuthAction.UPDATE_PROFILE:
    case AuthAction.CHANGE_PWD:
      return { ...state, isFetching: false };
    case AuthAction.GET_AUTHORITIES:
      return { ...state, isFetching: false, authorities: action.payload };
    case AuthAction.GET_PROFILE:
      return { ...state, isFetching: false, profile: action.payload };
    case AuthAction.LOGOUT:
      return { ...state, isFetching: false };
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
      dispatch({
        type: AuthAction.LOGIN_SUCCESS
      });
      console.log(response.data.token);
      saveToken(response.data.token);
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

    const api = API_URLS.Auth.logout();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({ type: AuthAction.LOGOUT });
      localStorage.removeItem('token');
      localStorage.removeItem('authUser');
      renderNotification('Đăng xuất thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification('Đăng xuất thất bại', NotiType.ERROR);
    }
  };

  const getAuthorities = useCallback(async (cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.getAuthorities();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.GET_AUTHORITIES,
        payload: response.data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      cb?.onError?.();
    }
  }, []);

  const getProfile = useCallback(async (cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.getProfile();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.GET_PROFILE,
        payload: response.data.data
      });

      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      cb?.onError?.();
    }
  }, []);

  return {
    state,
    login,
    logout,
    getAuthorities,
    getProfile
  };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  logout: async () => {},
  getAuthorities: async () => {},
  getProfile: async () => {}
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
