export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  emailAddress: string;
}

export type StudentWithoutId = Omit<Student, 'id'>;

export type StudentName = Omit<Student, 'id' | 'dateOfBirth' | 'emailAddress'>;
