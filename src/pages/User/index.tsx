import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserRole, IUserRoleDict } from '@/types/models/IUser';
import {
  Badge,
  Button,
  FileInput,
  Group,
  Input,
  Modal,
  Stack,
  Text
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ModalAddUser } from './components/ModalAddUser';
import { ModalEditUser } from './components/ModalEditUser';
import { Modals } from '@/utils/modals';

export const User = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootState) => state.user);
  const [user, setUser] = useState<IUser | null>();
  const [_records, setRecords] = useState(users);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const fileRef = useRef<HTMLButtonElement>(null);

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
    },
    {
      accessor: '',
      title: '',
      render: (row) => {
        return (
          <Group
            style={{
              justifyContent: 'center'
            }}
            color="red"
          >
            <IconTrash
              size={'1rem'}
              onClick={() => {
                Modals.openCustomConfirmModal({
                  title: 'Xóa môn học',
                  childrenText: 'Xác nhận xóa môn học này?',
                  onConfirm: () => {
                    dispatch(
                      UserActions.deleteUser(row.id, {
                        onSuccess: () => {
                          dispatch(UserActions.getAllUser());
                        }
                      })
                    );
                  },
                  onCancel: () => {
                    //
                  }
                });
              }}
            />
          </Group>
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
          <Group>
            <Button
              variant={'outline'}
              onClick={() => fileRef.current?.click()}
            >
              Tải lên Excel
            </Button>
            <Button onClick={openAddModal}>Thêm người dùng</Button>
          </Group>
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

      {user && (
        <Modal
          centered
          title="Sửa thông tin người dùng"
          opened={openedEditModal}
          onClose={closeEditModal}
          size={'lg'}
        >
          <ModalEditUser closeModal={closeAddModal} user={user} />
        </Modal>
      )}

      <FileInput
        style={{ display: 'none' }}
        ref={fileRef}
        accept=".xlsx"
        onChange={(files) => {
          if (files) {
            dispatch(
              UserActions.uploadExcel(files, {
                onSuccess: () => {
                  dispatch(UserActions.getAllUser());
                }
              })
            );
          }
        }}
      />
    </>
  );
};
