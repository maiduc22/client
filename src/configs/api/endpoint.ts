import { HEADERS } from './header';

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: '/Users/login',
      method: 'POST',
      headers: HEADERS.header()
    })
  },
  User: {
    getAll: () => ({
      endPoint: '/Users',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `/Users/signup`,
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
    upload: () => ({
      endPoint: `/Users/import-students`,
      method: 'POST',
      headers: HEADERS.fileHeader()
    }),
    getStudents: (semesterId: string, className: string) => ({
      endPoint: `/Users/students?semesterId=${semesterId}&className=${className}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    postScores: (semesterId: string, studentId: string) => ({
      endPoint: `/Scores?semesterId=${semesterId}&studentId=${studentId}`,
      method: 'POST',
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
      method: 'PUT',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/Subjects/${id}`,
      method: 'DELETE',
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
      method: 'PUT',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/Semesters/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader()
    })
  }
};
