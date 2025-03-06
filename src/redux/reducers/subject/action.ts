import { AppDispatch } from '@/redux/store';
import { SubjectActionType, SubjectThunkAction } from './types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { ChangeProfilePayload, CreateSubjectPayload, RegisterPayload, UpdateSubjectPayload } from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';

const getAllSubject =
  (): SubjectThunkAction => async (dispatch: AppDispatch) => {
    dispatch({
      type: SubjectActionType.SUBJECT_ACTION_PENDING
    });

    const api = API_URLS.Subject.getAll();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: SubjectActionType.GET_ALL_SUBJECT_SUCCESS,
        payload: data.data
      });
    } else {
      dispatch({ type: SubjectActionType.SUBJECT_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy danh sách môn học',
        NotiType.ERROR
      );
    }
  };

const createSubject =
  (payload: CreateSubjectPayload, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SubjectActionType.SUBJECT_ACTION_PENDING
    });

    const api = API_URLS.Subject.create();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: SubjectActionType.CREATE_SUBJECT_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tạo mới môn học thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SubjectActionType.SUBJECT_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi tạo mới', NotiType.ERROR);
    }
  };

const updateSubject =
  (payload: UpdateSubjectPayload, id: string | undefined, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: SubjectActionType.SUBJECT_ACTION_PENDING
    });

    const api = API_URLS.Subject.update(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: SubjectActionType.UPDATE_SUBJECT_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Cập nhật thông tin thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SubjectActionType.SUBJECT_ACTION_FAILURE });
      renderNotification('Cập nhật thông tin thất bại', NotiType.ERROR);
    }
  };

// const getSubjectById =
//   (id: string | undefined, cb?: Callback) => async (dispatch: AppDispatch) => {
//     if (!id) return;
//     dispatch({
//       type: SubjectActionType.SUBJECT_ACTION_PENDING
//     });

//     const api = API_URLS.Subject.ge(id);

//     const { response, error } = await useCallApi({ ...api });
//     if (!error && response?.status === 200) {
//       const { data } = response.data;

//       cb?.onSuccess?.(data);
//     } else {
//       dispatch({ type: SubjectActionType.SUBJECT_ACTION_FAILURE });
//       renderNotification(
//         'Lấy thông tin chi tiết người dùng thất bại',
//         NotiType.ERROR
//       );
//     }
//   };

const deleteSubject =
  (id: string | undefined, cb?: Callback) => async (dispatch: AppDispatch) => {
    if (!id) return;
    dispatch({
      type: SubjectActionType.SUBJECT_ACTION_PENDING
    });

    const api = API_URLS.Subject.delete(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: SubjectActionType.DELETE_SUBJECT_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Xóa môn học thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: SubjectActionType.SUBJECT_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi xóa môn học', NotiType.ERROR);
    }
  };

export const SubjectActions = {
  getAllSubject,
  createSubject,
  updateSubject,
  deleteSubject
};
