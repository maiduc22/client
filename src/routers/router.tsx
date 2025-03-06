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

const router = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<BaseLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTER.LOGIN} element={<Login />} />
        </Route>
        <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
          <Route path={ROUTER.BASE} element={<Home />} />
          <Route path={ROUTER.SUBJECT} element={<Subject />} />
          <Route path={ROUTER.SEMESTER} element={<Semester />} />
          <Route path={ROUTER.UNAUTHORIZE} element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
    )
  );
};

export default router;
