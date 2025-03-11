import { CreateUserPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { UserActions } from '@/redux/reducers/user/user.action';
import {
  classList,
  IUser,
  IUserRole,
  IUserRoleOptions
} from '@/types/models/IUser';
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
  user: IUser;
}

export const ModalEditUser = ({ closeModal, user }: Props) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm<CreateUserPayload>({
    initialValues: {
      username: user.username,
      password: user.password,
      fullName: user.fullName,
      role: user.role || IUserRole.STUDENT,
      className: user.className
    },
    validate: {
      username: isNotEmpty('Tên đăng nhập không được bỏ trống'),
      password: isNotEmpty('Mật khẩu không được bỏ trống'),
      fullName: isNotEmpty('Họ tên không được bỏ trống'),
      className: isNotEmpty('Lớp không được bỏ trống')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.updateUser(values, user.id, {
            onSuccess: () => {
              dispatch(UserActions.getAllUser());
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
          <Select
            withAsterisk
            data={classList.map((item) => ({ value: item, label: item }))}
            label="Lớp"
            placeholder="Chọn lớp"
            {...form.getInputProps('className')}
          />
        </Stack>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Cập nhật</Button>
      </Group>
    </form>
  );
};
