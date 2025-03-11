import { IUserRole } from '@/types/models/IUser';

export const isGrantedPermission = (
  role: IUserRole,
  resource: string,
  scope: string
) => {
  return true;
  if (!permission) return false;
  else {
    if (permission.isRoot) return true;
    const permissionKey = `${resource}:${scope}`;
    return permission.grantedPermissions.includes(permissionKey);
  }
};

export enum RESOURCES {
  SUBJECT = 'subject',
  SEMESTER = 'semester'
}

export enum SCOPES {
  VIEW = 'view',
  UPDATE = 'update',
  DELETE = 'delete',
  CREATE = 'create'
}
