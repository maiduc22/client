import { CreateSemesterPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { SemesterActions } from '@/redux/reducers/semester/action';
import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Stack,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  closeModal: () => void;
}

export const ModalAddSemester = ({ closeModal }: Props) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subject);

  const form = useForm<CreateSemesterPayload>({
    initialValues: {
      semesterName: '',
      subjectIds: [],
      year: 0
    },
    validate: {
      semesterName: isNotEmpty('Vui lòng nhập tên học kỳ'),
      subjectIds: isNotEmpty('Vui lòng chọn môn học'),
      year: isNotEmpty('Vui lòng nhập năm học')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        dispatch(
          SemesterActions.createSemester(values, {
            onSuccess: () => {
              dispatch(SemesterActions.getAllSemester());
              closeModal();
            }
          })
        );
      })}
    >
      <ScrollArea>
        <Stack spacing={'sm'}>
          <TextInput
            withAsterisk
            label="Tên học kỳ"
            placeholder="Nhập tên học kỳ"
            {...form.getInputProps('semesterName')}
          />
          <NumberInput
            withAsterisk
            label="Năm học"
            placeholder="Nhập năm học"
            {...form.getInputProps('year')}
          />
          <MultiSelect
            data={subjects.map(({ subjectName, id }) => ({
              value: id,
              label: subjectName
            }))}
            withAsterisk
            label="Môn học"
            placeholder="Chọn môn học"
            {...form.getInputProps('subjectIds')}
          />
        </Stack>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Thêm mới</Button>
      </Group>
    </form>
  );
};
