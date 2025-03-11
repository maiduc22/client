import { Center, Grid } from '@mantine/core';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER } from '@/configs/router';
import { IUserRole } from '@/types/models/IUser';

const AuthLayout = () => {
  if (localStorage.getItem('authUser')) {
    return <Navigate to={ROUTER.BASE} />;
  }

  return (
    <Grid
      style={{ width: '100vw' }}
      m={0}
      align="center"
      justify="center"
      sx={{
        minHeight: '100vh',
        maxHeight: '100vh'
      }}
    >
      <Grid.Col xs={12} md={5}>
        <Center>
          <Outlet />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;
