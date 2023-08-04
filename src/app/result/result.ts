export interface Result {
  id?: number;
  score: string;
  course: Course;
  student: Student;
}

export interface Course {
  id?: number;
  courseName: string;
}

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
}
