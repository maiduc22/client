import { ISubject } from '@/types/models/ISubject';
import { IUserRole } from '@/types/models/IUser';

export type LoginPayload = {
  username: string;
  password: string;
};

export type ChangePwdPayload = {
  password: string;
};

export type CreateUserPayload = {
  username: string;
  fullName: string;
  password: string;
  role: IUserRole;
};

//

export type CreateSubjectPayload = Omit<ISubject, 'id'>;
export type UpdateSubjectPayload = CreateSubjectPayload;
export type CreateSemesterPayload = {
  semesterName: string;
  year: number;
  subjectIds: string[];
};
export type UpdateSemesterPayload = CreateSemesterPayload;

export type ApiEndPointPayload =
  | LoginPayload
  | CreateUserPayload
  | CreateSubjectPayload
  | UpdateSubjectPayload
  | CreateSemesterPayload
  | UpdateSemesterPayload;
