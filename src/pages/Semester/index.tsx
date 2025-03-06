import { useAuthContext } from '@/hooks/context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { ISemester } from '@/types/models/ISemester';
import { RESOURCES, SCOPES, isGrantedPermission } from '@/utils/permissions';
import { Badge, Button, Group, Input, Modal, Stack, Text } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalAddSemester } from './components/ModalAddSemester';
import { SemesterActions } from '@/redux/reducers/semester/action';

export const Semester = () => {
  const { state } = useAuthContext();
  const { authorities } = state;
  const [_authorities, setAuthorities] = useState(authorities);

  useEffect(() => {
    setAuthorities(authorities);
  }, [authorities]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(SemesterActions.getAllSemester());
  }, [dispatch]);

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
              s.semesterName.toLowerCase().includes(debounceQuery.toLowerCase())
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
      accessor: 'id',
      title: 'Hành động',
      render: (value) => (
        <Group>
          <Button
            color="teal"
            variant="light"
            onClick={() =>
              // navigate(ROUTER.SEMESTER_DETAIL.replace(':id', value))
              console.log('navigate to detail')
            }
          >
            Chi tiết
          </Button>
          {isGrantedPermission(
            _authorities,
            RESOURCES.SEMESTER,
            SCOPES.UPDATE
          ) && (
            <Button
              color="teal"
              variant="light"
              onClick={() =>
                // navigate(ROUTER.SEMESTER_EDIT.replace(':id', value))
                console.log('navigate to detail')
              }
            >
              Sửa
            </Button>
          )}
        </Group>
      )
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
            placeholder="Tìm kiếm theo tên"
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
    </>
  );
};
