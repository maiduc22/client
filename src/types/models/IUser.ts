import { BaseModel } from '.';

export interface IUser extends BaseModel {
  username: string;
  fullName: string;
  password: string;
  role?: IUserRole;
}

export enum IUserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export const IUserRoleOptions = Object.keys(IUserRole).map((key) => ({
  value: IUserRole[key as keyof typeof IUserRole],
  label: IUserRole[key as keyof typeof IUserRole]
}));

export enum IUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const IUserStatusDict: Record<
  IUserStatus,
  { label: string; color: string }
> = {
  [IUserStatus.ACTIVE]: {
    label: 'Đang hoạt động',
    color: 'blue'
  },
  [IUserStatus.INACTIVE]: {
    label: 'Dừng hoạt động',
    color: 'orange'
  }
};

export const IUserRoleDict: Record<
  IUserRole,
  { label: string; color: string }
> = {
  [IUserRole.STUDENT]: {
    label: 'Học sinh',
    color: 'blue'
  },
  [IUserRole.TEACHER]: {
    label: 'Giáo viên',
    color: 'orange'
  },
  [IUserRole.ADMIN]: {
    label: 'Quản trị viên',
    color: 'green'
  }
};
