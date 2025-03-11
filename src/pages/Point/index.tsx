import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { UserActions } from '@/redux/reducers/user/user.action';
import { ISemester } from '@/types/models/ISemester';
import { classList, IStudent, IUser, IUserRole } from '@/types/models/IUser';
import {
  Button,
  Col,
  Container,
  Grid,
  Group,
  Modal,
  NumberInput,
  Stack,
  Tabs,
  Text
} from '@mantine/core';
import usePagination from '@/hooks/use-pagination';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/reducers';
import { ISubject } from '@/types/models/ISubject';
import { useDisclosure } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import CustomLoader from '@/components/custom/CustomLoader';
import { useAuthContext } from '@/hooks/context';

export const Point = () => {
  const { state, logout } = useAuthContext();
  const { semesters, isFetching } = useAppSelector(
    (state: RootState) => state.semester
  );
  const [_semesters, setSemesters] = useState<ISemester[] | []>(semesters);

  console.log(state);
  useEffect(() => {
    setSemesters(semesters);
  }, [semesters]);

  if (isFetching || !_semesters.length) {
    return <CustomLoader />;
  }
  return (
    <>
      <Stack>
        <Text fw={600} size={'lg'}>
          Quản lý điểm
        </Text>
        <Tabs variant={'outline'} defaultValue={_semesters[0].semesterName}>
          <Tabs.List>
            {_semesters.map((semester) => (
              <Tabs.Tab key={semester.id} value={semester.semesterName}>
                {semester.semesterName}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {_semesters.map((semester) => (
            <Tabs.Panel key={semester.id} value={semester.semesterName}>
              <Container mt={20} ml={-20}>
                <Tabs defaultValue={classList[0]} orientation="vertical">
                  <Tabs.List>
                    {classList
                      .filter((classItem) => {
                        if (state.role !== IUserRole.ADMIN) {
                          return classItem === state.className;
                        }
                        return true;
                      })
                      .map((classItem) => (
                        <Tabs.Tab key={classItem} value={classItem}>
                          {classItem}
                        </Tabs.Tab>
                      ))}
                  </Tabs.List>

                  {classList
                    .filter((classItem) => {
                      if (state.role !== IUserRole.ADMIN) {
                        return classItem === state.className;
                      }
                      return true;
                    })
                    .map((classItem) => (
                      <Tabs.Panel key={classItem} value={classItem}>
                        <TabContent
                          semesterId={semester.id}
                          className={classItem}
                          subjects={semester.subjects}
                        />
                      </Tabs.Panel>
                    ))}
                </Tabs>
              </Container>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </>
  );
};

const TabContent = ({
  semesterId,
  className,
  subjects
}: {
  semesterId: string;
  className: string;
  subjects: ISubject[];
}) => {
  const dispatch = useAppDispatch();
  const { state: authState } = useAuthContext();
  const [_students, setStudents] = useState<IStudent[]>([]);
  const [_selectedStudent, setSelectedStudent] = useState<IStudent | null>(
    null
  );

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure();
  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _students,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });
  useEffect(() => {
    dispatch(
      UserActions.getStudents(semesterId, className, {
        onSuccess: (data) => {
          if (authState.role === IUserRole.STUDENT) {
            const studentData = data.find(
              (student) => student.id == authState.id
            );
            console.log('studentData:', studentData);
            setStudents(studentData ? [studentData] : []);
          } else {
            setStudents(data);
          }
        }
      })
    );
  }, [dispatch, semesterId, className]);

  const form = useForm({
    initialValues: {
      scores: subjects.map((subject) => ({
        subjectId: subject.id,
        midtermScore: 0,
        finalScore: 0
      }))
    }
  });

  const handleSubmit = (values) => {
    dispatch(
      UserActions.postScores(
        semesterId,
        _selectedStudent?.id || '',
        values.scores,
        {
          onSuccess: () => {
            dispatch(
              UserActions.getStudents(semesterId, className, {
                onSuccess: (data) => {
                  if (authState.role === IUserRole.STUDENT) {
                    const studentData = data.find(
                      (student) => student.id == authState.id
                    );
                    console.log('studentData:', studentData);
                    setStudents(studentData ? [studentData] : []);
                  } else {
                    setStudents(data);
                  }
                }
              })
            );
            closeModal();
          }
        }
      )
    );
    // Handle form submission logic here
  };

  const handleStudentSelect = (student: IStudent) => {
    setSelectedStudent(student);
    form.setValues({
      scores: subjects.map((subject) => {
        console.log('subject:', subject, student.scores);
        const existingScore = student.scores.find(
          (score) => score.subjectId == subject.id
        );
        return {
          subjectId: subject.id,
          midtermScore: existingScore ? existingScore.midtermScore : 0,
          finalScore: existingScore ? existingScore.finalScore : 0
        };
      })
    });
    openModal();
  };

  return (
    <>
      <Stack ml={20}>
        <Text size={'sm'}>
          {authState.role === IUserRole.STUDENT
            ? 'Thông tin điểm'
            : 'Danh sách học sinh'}
        </Text>
        <DataTable
          minHeight={300}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={[
            { accessor: 'id', title: 'ID' },
            { accessor: 'fullName', title: 'Họ tên' },
            { accessor: 'className', title: 'Lớp' },
            {
              accessor: '',
              title: '',

              render: (value) => (
                <Group position="center">
                  <IconInfoCircle
                    onClick={() => {
                      handleStudentSelect(value);
                    }}
                    size={'1rem'}
                  />
                </Group>
              )
            }
          ]}
          records={records}
          totalRecords={_students.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />

        <Modal
          centered
          opened={openedModal}
          onClose={closeModal}
          title={
            <Group align={'center'}>
              <Text size="lg" fw={600}>
                Thông tin điểm
              </Text>
            </Group>
          }
          size="lg"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {form.values.scores.map((score, index) => (
              <div key={score.subjectId}>
                <Group align={'center'} position={'apart'} pb={15}>
                  <Grid justify="center" align="flex-end">
                    <Col span={4}>
                      <Text sx={{ width: 200 }} fw={500} fz={'md'}>
                        {
                          subjects.find(
                            (subject) => subject.id === score.subjectId
                          )?.subjectName
                        }
                      </Text>
                    </Col>
                    <Col span={3}>
                      <Text size={'xs'} fw={600}>
                        Giữa kỳ
                      </Text>
                      <NumberInput
                        {...form.getInputProps(`scores.${index}.midtermScore`)}
                        size="xs"
                        readOnly={authState.role === IUserRole.STUDENT}
                      />
                    </Col>
                    <Col span={3}>
                      <Text size={'xs'} fw={600}>
                        Cuối kỳ
                      </Text>
                      <NumberInput
                        {...form.getInputProps(`scores.${index}.finalScore`)}
                        size="xs"
                        readOnly={authState.role === IUserRole.STUDENT}
                      />
                    </Col>
                    <Col span={2}>
                      <Text size={'xs'} fw={600}>
                        Tổng kết
                      </Text>
                      <Text size={'xs'} mt={10} mb={2} ml={10}>
                        {calculateFinalScore(
                          score.midtermScore,
                          score.finalScore
                        )}
                      </Text>
                    </Col>
                  </Grid>
                </Group>
              </div>
            ))}
            {authState.role !== IUserRole.STUDENT && (
              <Group position={'right'}>
                <Button mt={20} type="submit">
                  {'Lưu'}
                </Button>
              </Group>
            )}
          </form>
        </Modal>
      </Stack>
    </>
  );
};

export default Point;

const calculateFinalScore = (
  midtermScore: number,
  finalScore: number
): number => {
  return Math.round((midtermScore * 0.4 + finalScore * 0.6) * 100) / 100;
};
