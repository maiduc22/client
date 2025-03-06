import { CreateUserPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUserRole, IUserRoleOptions } from '@/types/models/IUser';
import {
  Button,
  Group,
  ScrollArea,
  Select,
  Stack,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  closeModal: () => void;
}

export const ModalAddUser = ({ closeModal }: Props) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm<CreateUserPayload>({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
      role: IUserRole.STUDENT
    },
    validate: {
      username: isNotEmpty('Tên đăng nhập không được bỏ trống'),
      password: isNotEmpty('Mật khẩu không được bỏ trống'),
      fullName: isNotEmpty('Họ tên không được bỏ trống')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.createUser(values, {
            onSuccess: () => {
              dispatch(UserActions.getAllUser());
              console.log('Tạo mới người dùng thành công', values);
              closeModal();
            }
          })
        )
      )}
    >
      <ScrollArea h={500}>
        <Stack spacing={'sm'}>
          <TextInput
            withAsterisk
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label="Họ tên"
            placeholder="Nhập họ tên"
            {...form.getInputProps('fullName')}
          />
          <TextInput
            withAsterisk
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            {...form.getInputProps('password')}
          />
          <Select
            data={IUserRoleOptions}
            label="Vai trò"
            placeholder="Chọn vai trò"
            {...form.getInputProps('role')}
          />
        </Stack>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Thêm mới</Button>
      </Group>
    </form>
  );
};
