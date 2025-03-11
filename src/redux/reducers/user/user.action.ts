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

const uploadExcel =
  (payload: File, cb?: Callback) => async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const formData = new FormData();
    formData.append('file', payload);
    const api = API_URLS.User.upload();

    const { response, error } = await useCallApi({ ...api, payload: formData });
    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.CREATE_USER_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tải lên file excel thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification('Tải lên file excel thất bại', NotiType.ERROR);
    }
  };

const getStudents =
  (semeterId: string, className: string, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const api = API_URLS.User.getStudents(semeterId, className);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: UserActionType.GET_STUDENTS_SUCCESS,
        payload: data
      });
      cb?.onSuccess?.(data);
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification('Lấy danh sách sinh viên thất bại', NotiType.ERROR);
    }
  };

const postScores =
  (semesterId: string, studentId: string, payload: any, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.USER_ACTION_PENDING
    });

    const api = API_URLS.User.postScores(semesterId, studentId);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.POST_SCORES_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tải lên điểm thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: UserActionType.USER_ACTION_FAILURE });
      renderNotification('Tải lên điểm thất bại', NotiType.ERROR);
    }
  };
export const UserActions = {
  getAllUser,
  createUser,
  updateUser,
  getUserById,
  uploadExcel,
  getStudents,
  postScores
};
