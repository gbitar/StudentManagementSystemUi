export interface Course {
  id: number;
  courseName: string;
}

// Create a new type CourseWithoutId that excludes the id property
export type CourseWithoutId = Omit<Course, 'id'>;
