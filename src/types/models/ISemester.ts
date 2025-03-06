import { BaseModel } from '.';
import { ISubject } from './ISubject';

export interface ISemester extends BaseModel {
  semesterName: string;
  year: number;
  subjects: ISubject[];
}
