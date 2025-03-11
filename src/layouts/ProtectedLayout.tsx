/* eslint-disable react-hooks/rules-of-hooks */
import appIcon from '@/assets/imgs/bg.jpg';
import CustomLoader from '@/components/custom/CustomLoader';
import { ROUTER } from '@/configs/router';

import { useAuthContext } from '@/hooks/context';
import { useAppDispatch } from '@/hooks/redux';
import { SemesterActions } from '@/redux/reducers/semester/action';
import { SubjectActions } from '@/redux/reducers/subject/action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUserRole } from '@/types/models/IUser';
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Button,
  Group,
  Header,
  Image,
  Navbar,
  Popover,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme
} from '@mantine/core';
import {
  IconBrandAsana,
  IconLogout,
  IconPoint,
  IconTicTac,
  IconUser
} from '@tabler/icons-react';
import { Suspense, useLayoutEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

interface NavLinkProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
  auth: boolean;
}

const NavLink = ({ icon, color, label, to }: NavLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const User = () => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`
      }}
    >
      <Popover position={'top-end'} shadow="xs" withArrow arrowSize={10}>
        <Popover.Target>
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0]
              }
            }}
          >
            <Group>
              <Avatar radius="xl" src={''} />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {localStorage.getItem('fullname') || 'Tên tài khoản'}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </Popover.Target>
      </Popover>
    </Box>
  );
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuthContext();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    navigate(ROUTER.LOGIN);
    logout();
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to={ROUTER.LOGIN} />;
  }

  useLayoutEffect(() => {
    dispatch(SubjectActions.getAllSubject());
    dispatch(SemesterActions.getAllSemester());
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const navLinks: NavLinkProps[] = [
    {
      icon: <IconPoint size="1rem" />,
      color: 'orange',
      label: 'Quản Lý Điểm',
      to: ROUTER.POINT,
      auth: true
    },
    {
      icon: <IconUser size="1rem" />,
      color: 'red',
      label: 'Quản Lý Người Dùng',
      to: ROUTER.USER,
      auth: state.role === IUserRole.ADMIN
    },
    {
      icon: <IconTicTac size="1rem" />,
      color: 'blue',
      label: 'Quản Lý Học Kỳ',
      to: ROUTER.SEMESTER,
      auth: state.role === IUserRole.ADMIN
    },
    {
      icon: <IconBrandAsana size="1rem" />,
      color: 'grape',
      label: 'Quản Lý Môn Học',
      to: ROUTER.SUBJECT,
      auth: state.role === IUserRole.ADMIN
    }
  ];
  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: 'calc(100vw - 32px)'
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={true}
            width={{ sm: 200, lg: 250 }}
          >
            <Navbar.Section grow mt="0">
              <div>
                {navLinks
                  .filter((link) => link.auth === true)
                  .map((link) => (
                    <NavLink {...link} key={link.label} />
                  ))}
              </div>
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.BASE}>
                  <Image src={appIcon} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  Hệ Thống Quản Lý Sinh Viên
                </Text>
              </Group>
              <Group>
                <Button
                  onClick={handleLogout}
                  variant="subtle"
                  color="red"
                  leftIcon={<IconLogout size={20} />}
                >
                  Đăng xuất
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<CustomLoader />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
};

export default ProtectedLayout;
