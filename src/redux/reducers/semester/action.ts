import { AppDispatch } from '@/redux/store';
import { SemesterActionType, SemesterThunkAction } from './types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import {
  CreateSemesterPayload,
  UpdateSemesterPayload
} from '@/configs/api/payload';

const getAllSemester =
  (): SemesterThunkAction => async (dispatch: AppDispatch) => {
    dispatch({
      type: SemesterActionType.SEMESTER_ACTION_PENDING
    });

    const api = API_URLS.Semester.getAll();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: SemesterActionType.GET_ALL_SEMESTER_SUCCESS,
        payload: data
      });
    } else {
      dispatch({ type: SemesterActionType.SEMESTER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi lấy danh sách học kỳ', NotiType.ERROR);
    }
  };

const createSemester =
  (payload: CreateSemesterPayload, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SemesterActionType.SEMESTER_ACTION_PENDING
    });

    const api = API_URLS.Semester.create();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: SemesterActionType.CREATE_SEMESTER_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tạo mới học kỳ thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SemesterActionType.SEMESTER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi tạo mới', NotiType.ERROR);
    }
  };

const updateSemester =
  (payload: UpdateSemesterPayload, id: string | undefined, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: SemesterActionType.SEMESTER_ACTION_PENDING
    });

    const api = API_URLS.Semester.update(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: SemesterActionType.UPDATE_SEMESTER_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Cập nhật thông tin thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SemesterActionType.SEMESTER_ACTION_FAILURE });
      renderNotification('Cập nhật thông tin thất bại', NotiType.ERROR);
    }
  };

// const getSemesterById =
//   (id: string | undefined, cb?: Callback) => async (dispatch: AppDispatch) => {
//     if (!id) return;
//     dispatch({
//       type: SemesterActionType.SEMESTER_ACTION_PENDING
//     });

//     const api = API_URLS.Semester.ge(id);

//     const { response, error } = await useCallApi({ ...api });
//     if (!error && response?.status === 200) {
//       const { data } = response.data;

//       cb?.onSuccess?.(data);
//     } else {
//       dispatch({ type: SemesterActionType.SEMESTER_ACTION_FAILURE });
//       renderNotification(
//         'Lấy thông tin chi tiết người dùng thất bại',
//         NotiType.ERROR
//       );
//     }
//   };

const deleteSemester =
  (id: string | undefined, cb?: Callback) => async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: SemesterActionType.SEMESTER_ACTION_PENDING
    });

    const api = API_URLS.Semester.delete(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: SemesterActionType.DELETE_SEMESTER_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Xóa học kỳ thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SemesterActionType.SEMESTER_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi xóa học kỳ', NotiType.ERROR);
    }
  };

export const SemesterActions = {
  getAllSemester,
  createSemester,
  updateSemester,
  deleteSemester
};
