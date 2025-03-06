import { BaseModel } from '.';

export interface ISubject extends BaseModel {
  subjectCode: string;
  subjectName: string;
  creditNumber: number;
  description: string;
}
