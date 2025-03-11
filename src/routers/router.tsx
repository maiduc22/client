import AuthLayout from '@/layouts/AuthLayout';
import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import Page403 from '@/pages/Error/403';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Page404 from '../pages/Error/404';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import { Subject } from '@/pages/Subject';
import { Semester } from '@/pages/Semester';
import { User } from '@/pages/User';
import { Point } from '@/pages/Point';
import ProtectedRoute from './permissionRoute';
import { IUserRole } from '@/types/models/IUser';

const router = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<BaseLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTER.LOGIN} element={<Login />} />
        </Route>
        <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
          <Route
            path={ROUTER.BASE}
            element={
              <ProtectedRoute allowedRoles={[IUserRole.ADMIN]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTER.SUBJECT}
            element={
              <ProtectedRoute allowedRoles={[IUserRole.ADMIN]}>
                <Subject />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTER.USER}
            element={
              <ProtectedRoute allowedRoles={[IUserRole.ADMIN]}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTER.SEMESTER}
            element={
              <ProtectedRoute allowedRoles={[IUserRole.ADMIN]}>
                <Semester />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTER.POINT} element={<Point />} />
          <Route path={ROUTER.UNAUTHORIZE} element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
    )
  );
};

export default router;
