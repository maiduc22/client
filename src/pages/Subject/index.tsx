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
import { IconDownload, IconInfoCircle } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ModalAddSubject } from './components/ModalAddSubject';
import { SubjectActions } from '@/redux/reducers/subject/action';

export const Subject = () => {
  const { state } = useAuthContext();
  const { authorities } = state;
  const [_authorities, setAuthorities] = useState(authorities);

  useEffect(() => {
    setAuthorities(authorities);
  }, [authorities]);

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

  const columns: DataTableColumn<ISubject>[] = [
    { accessor: 'subjectCode', title: 'Mã môn học' },
    { accessor: 'subjectName', title: 'Họ tên' },
    { accessor: 'creditNumber', title: 'Email' },
    { accessor: 'description', title: 'Số điện thoại' }
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
    </>
  );
};
