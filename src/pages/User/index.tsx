import { useAuthContext } from '@/hooks/context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import {
  IUser,
  IUserRole,
  IUserRoleDict,
  IUserStatusDict
} from '@/types/models/IUser';
import { RESOURCES, SCOPES, isGrantedPermission } from '@/utils/permissions';
import {
  Badge,
  Button,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconDownload, IconInfoCircle } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ModalAddUser } from './components/ModalAddUser';

export const User = () => {
  const { state } = useAuthContext();
  const { authorities } = state;
  const [_authorities, setAuthorities] = useState(authorities);

  useEffect(() => {
    setAuthorities(authorities);
  }, [authorities]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootState) => state.user);

  const [_records, setRecords] = useState(users);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(
    () =>
      setRecords(
        users.filter((user) => {
          if (debounceQuery !== '') {
            if (
              user.username
                .toLowerCase()
                .includes(debounceQuery.toLowerCase()) ||
              user.fullName.toLowerCase().includes(debounceQuery.toLowerCase())
            ) {
              return true;
            }
          } else {
            return true;
          }
        })
      ),
    [users, debounceQuery]
  );

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'username', title: 'Tên đăng nhập' },
    { accessor: 'fullName', title: 'Họ tên' },
    {
      accessor: 'role',
      title: 'Vai trò',
      render: (value) => {
        return (
          <Badge
            color={IUserRoleDict[value.role || IUserRole.STUDENT].color}
            variant="filled"
          >
            {value.role}
          </Badge>
        );
      }
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  // if (!_authorities) {
  //   return <CustomLoader />;
  // }

  // if (!isGrantedPermission(_authorities, RESOURCES.USER, SCOPES.VIEW)) {
  //   return <Navigate to={ROUTER.UNAUTHORIZE} />;
  // }

  return (
    <>
      <Stack>
        <Text fw={600} size={'lg'}>
          Danh sách người dùng
        </Text>
        <Group position="apart">
          <Input
            placeholder="Tìm kiếm theo tên đăng nhập, họ tên"
            miw={300}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button onClick={openAddModal}>Thêm người dùng</Button>
          {/* <Group>
            {isGrantedPermission(
              _authorities,
              RESOURCES.USER,
              SCOPES.CREATE
            ) ? (
              <Button onClick={openAddModal}>Thêm người dùng</Button>
            ) : null}
          </Group> */}
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={_records.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>

      <Modal
        centered
        title="Tạo mới người dùng"
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddUser closeModal={closeAddModal} />
      </Modal>
    </>
  );
};
