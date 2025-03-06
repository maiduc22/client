import { CreateSubjectPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { SubjectActions } from '@/redux/reducers/subject/action';
import { ISubject } from '@/types/models/ISubject';
import {
  Button,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  TextInput,
  useMantineTheme
} from '@mantine/core';

import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  closeModal: () => void;
  subjectData: ISubject | null;
}

export const ModalEditSubject = ({ closeModal, subjectData }: Props) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm<CreateSubjectPayload>({
    initialValues: {
      subjectCode: subjectData?.subjectCode || '',
      subjectName: subjectData?.subjectName || '',
      description: subjectData?.description || '',
      creditNumber: subjectData?.creditNumber || 0
    },
    validate: {
      subjectCode: isNotEmpty('Vui lòng nhập mã môn học'),
      subjectName: isNotEmpty('Vui lòng nhập tên môn học'),
      creditNumber: isNotEmpty('Vui lòng nhập số tín chỉ')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          SubjectActions.updateSubject(values, subjectData?.id || '', {
            onSuccess: () => {
              dispatch(SubjectActions.getAllSubject());
              closeModal();
            }
          })
        )
      )}
    >
      <ScrollArea>
        <Stack spacing={'sm'}>
          <TextInput
            withAsterisk
            label="Mã môn học"
            placeholder="Nhập mã môn học"
            {...form.getInputProps('subjectCode')}
          />
          <TextInput
            withAsterisk
            label="Tên môn học"
            placeholder="Nhập tên môn học"
            {...form.getInputProps('subjectName')}
          />

          <NumberInput
            withAsterisk
            label="Số tín chỉ"
            placeholder="Nhập số tín chỉ"
            {...form.getInputProps('creditNumber')}
          />
          <TextInput
            withAsterisk
            label="Mô tả"
            placeholder="Nhập mô tả"
            {...form.getInputProps('description')}
          />
        </Stack>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Cập nhật</Button>
      </Group>
    </form>
  );
};
