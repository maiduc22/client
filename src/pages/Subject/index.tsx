import CustomLoader from '@/components/custom/CustomLoader';
import { api } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { ROUTER } from '@/configs/router';
import { useAuthContext } from '@/hooks/context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { ISubject } from '@/types/models/ISubject';
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
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ModalAddSubject } from './components/ModalAddSubject';
import { SubjectActions } from '@/redux/reducers/subject/action';
import { ModalEditSubject } from './components/ModalEditSubject';
import { openConfirmModal } from '@mantine/modals';
import { Modals } from '@/utils/modals';

export const Subject = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(SubjectActions.getAllSubject());
  }, [dispatch]);

  const { subjects } = useAppSelector((state: RootState) => state.subject);
  const [_records, setRecords] = useState(subjects);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(
    () =>
      setRecords(
        subjects.filter((s) => {
          if (debounceQuery !== '') {
            if (
              s.subjectCode
                .toLowerCase()
                .includes(debounceQuery.toLowerCase()) ||
              s.subjectName.toLowerCase().includes(debounceQuery.toLowerCase())
            ) {
              return true;
            }
          } else {
            return true;
          }
        })
      ),
    [subjects, debounceQuery]
  );

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const [subjectData, setSubjectData] = useState<ISubject | null>(null);

  const columns: DataTableColumn<ISubject>[] = [
    { accessor: 'subjectCode', title: 'Mã môn học' },
    { accessor: 'subjectName', title: 'Môn học' },
    { accessor: 'creditNumber', title: 'Số tín chỉ' },
    { accessor: 'description', title: 'Mô tả' },
    {
      accessor: '',
      title: '',
      render: (row) => {
        return (
          <Group position="center">
            <IconEdit
              size={'1rem'}
              onClick={() => {
                openEditModal();
                setSubjectData(row);
              }}
            />
            <IconTrash
              size={'1rem'}
              onClick={() => {
                Modals.openCustomConfirmModal({
                  title: 'Xóa môn học',
                  childrenText: 'Xác nhận xóa môn học này?',
                  onConfirm: () => {
                    dispatch(
                      SubjectActions.deleteSubject(row.id, {
                        onSuccess: () => {
                          dispatch(SubjectActions.getAllSubject());
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
          Danh sách môn học
        </Text>
        <Group position="apart">
          <Input
            placeholder="Tìm kiếm theo tên hoặc mã"
            miw={300}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button onClick={openAddModal}>Thêm môn học</Button>
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
        title="Tạo mới môn học"
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddSubject closeModal={closeAddModal} />
      </Modal>

      <Modal
        centered
        title="Chỉnh sửa môn học"
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalEditSubject
          closeModal={closeEditModal}
          subjectData={subjectData}
        />
      </Modal>
    </>
  );
};
