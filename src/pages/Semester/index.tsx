import { useAuthContext } from '@/hooks/context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { ISemester } from '@/types/models/ISemester';
import { Badge, Button, Group, Input, Modal, Stack, Text } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalAddSemester } from './components/ModalAddSemester';
import { SemesterActions } from '@/redux/reducers/semester/action';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ModalEditSemester } from './components/ModalEditSemester';
import { Modals } from '@/utils/modals';

export const Semester = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { semesters } = useAppSelector((state: RootState) => state.semester);

  const [_records, setRecords] = useState(semesters);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(
    () =>
      setRecords(
        semesters.filter((s) => {
          if (debounceQuery !== '') {
            if (
              s.semesterName
                .toLowerCase()
                .includes(debounceQuery.toLowerCase()) ||
              s.year.toString().includes(debounceQuery)
            ) {
              return true;
            }
          } else {
            return true;
          }
        })
      ),
    [semesters, debounceQuery]
  );

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const [semester, setSemester] = useState<ISemester | null>();

  const columns: DataTableColumn<ISemester>[] = [
    { accessor: 'semesterName', title: 'Học kỳ' },
    { accessor: 'year', title: 'Năm học' },
    {
      accessor: 'subjects',
      title: 'Môn học',
      render: (s) => (
        <Group>
          {s.subjects.map((subject) => (
            <Badge key={subject.id} color="teal" variant="filled">
              {subject.subjectName}
            </Badge>
          ))}
        </Group>
      )
    },
    {
      accessor: '',
      title: '',
      render: (semester) => {
        return (
          <Group
            style={{
              justifyContent: 'center'
            }}
            color="red"
          >
            <IconEdit
              size={'1rem'}
              onClick={() => {
                setSemester(semester);
                openEditModal();
              }}
            />
            <IconTrash
              size={'1rem'}
              onClick={() => {
                Modals.openCustomConfirmModal({
                  title: 'Xác nhận xóa',
                  childrenText: 'Bạn có chắc chắn muốn xóa học kỳ này?',
                  onConfirm: () => {
                    dispatch(
                      SemesterActions.deleteSemester(semester.id, {
                        onSuccess: () =>
                          dispatch(SemesterActions.getAllSemester())
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
          Danh sách học kỳ
        </Text>
        <Group position="apart">
          <Input
            placeholder="Tìm kiếm theo tên học kỳ, năm học"
            miw={300}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button onClick={openAddModal}>Thêm học kỳ</Button>
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
        title="Tạo mới học kỳ"
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddSemester closeModal={closeAddModal} />
      </Modal>

      {semester && (
        <Modal
          centered
          title="Cập nhật học kỳ"
          opened={openedEditModal}
          onClose={closeEditModal}
          size={'lg'}
        >
          <ModalEditSemester semester={semester} closeModal={closeEditModal} />
        </Modal>
      )}
    </>
  );
};
