import { IRequestStatus } from '@/types/models/IRequest';
import { HEADERS } from './header';

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: '/authenticate',
      method: 'POST',
      headers: HEADERS.header()
    }),
    logout: () => ({
      endPoint: `/me/logout`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    getAuthorities: () => ({
      endPoint: '/me/authorities',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    getProfile: () => ({
      endPoint: '/me',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    changeProfile: (id: string) => ({
      endPoint: `/me/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    changePassword: () => ({
      endPoint: `/me/change-pwd`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Unit: {
    getAll: () => ({
      endPoint: `/units`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `/units`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/units/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/units/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    getDetails: (id: string) => ({
      endPoint: `/units/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    addUser: (id: string) => ({
      endPoint: `/units/${id}/add-user`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    removeUser: (id: string, userId: string) => ({
      endPoint: `/units/${id}/delete-user/?userId=${userId}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    exportExcel: () => ({
      endPoint: `/units/export`,
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },
  User: {
    getAll: () => ({
      endPoint: '/users',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `/register`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    getUserById: (id: string) => ({
      endPoint: `/users/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    updateUser: (id: string) => ({
      endPoint: `/users/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    download: () => ({
      endPoint: `/users/export`,
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },
  Role: {
    getAll: () => ({
      endPoint: '/roles',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: '/roles',
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/roles/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    toggle: (id: string) => ({
      endPoint: `roles/${id}/toggle`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `roles/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    assignPermission: (id: string) => ({
      endPoint: `roles/${id}/assign-permission`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    getDetails: (id: string) => ({
      endPoint: `/roles/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    addUser: (id: string) => ({
      endPoint: `/roles/${id}/add-user`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    removeUser: (id: string, userId: string) => ({
      endPoint: `/roles/${id}/delete-user/?userId=${userId}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Permission: {
    getAll: () => ({
      endPoint: '/permissions',
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },
  TimeOff: {
    request: () => ({
      endPoint: '/time-off/request',
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    getMyRequest: () => ({
      endPoint: '/time-off/my-request',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    getMyTimeoff: () => ({
      endPoint: '/time-off/my-timeoff',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    getBalanceHistory: () => ({
      endPoint: '/time-off/balance',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    getAllRequest: () => ({
      endPoint: 'time-off',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    changeStatus: (id: string, status: IRequestStatus) => ({
      endPoint: `/time-off/${id}/change-status?status=${status}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Subject: {
    getAll: () => ({
      endPoint: '/Subjects',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: '/Subjects',
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/Subjects/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/Subjects/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Semester: {
    getAll: () => ({
      endPoint: '/Semesters',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: '/Semesters',
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/Semesters/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/Semesters/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  }
};
