import { AppDispatch } from '@/redux/store';
import { UserActionType, UserThunkAction } from './user.types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateUserPayload } from '@/configs/api/payload';

const getAllUser = (): UserThunkAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: UserActionType.USER_ACTION_PENDING
  });

  const api = API_URLS.User.getAll();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: UserActionType.GET_ALL_USER_SUCCESS,
      payload: data
    });
  } else {
    dispatch({ type: UserActionType.USER_ACTION_FAILURE });
    renderNotification(
      'Đã có lỗi khi lấy danh sách người dùng',
      NotiType.ERROR
    );
  }
};

const createUser =
  (payload: CreateUserPayload, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    console.log('payload', payload);
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const api = API_URLS.User.create();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      // dispatch({
      //   type: UserActionType.CREATE_USER_SUCCESS
      // });
      cb?.onSuccess?.();
      renderNotification('Tạo mới người dùng thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi tạo mới người dùng', NotiType.ERROR);
    }
  };

const updateUser =
  (payload: CreateUserPayload, id: string | undefined, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const api = API_URLS.User.updateUser(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.UPDATE_USER_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification(
        'Cập nhật thông tin người dùng thành công',
        NotiType.SUCCESS
      );
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification(
        'Cập nhật thông tin người dùng thất bại',
        NotiType.ERROR
      );
    }
  };

const getUserById =
  (id: string | undefined, cb?: Callback) => async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const api = API_URLS.User.getUserById(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response.data;

      cb?.onSuccess?.(data);
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification(
        'Lấy thông tin chi tiết người dùng thất bại',
        NotiType.ERROR
      );
    }
  };
export const UserActions = { getAllUser, createUser, updateUser, getUserById };
