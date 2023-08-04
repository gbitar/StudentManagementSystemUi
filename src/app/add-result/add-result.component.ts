import { Component, OnInit } from '@angular/core';
import { Result } from '../result/result';
import { Course } from '../course/course';
import { Student } from '../student/student';
import { ResultService } from '../result/result.service';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
  result: Result = {
    score: '',
    course: { courseName: '' },
    student: { firstName: '', lastName: '' }
  };
  showNotification: boolean = false;

  constructor(private resultService: ResultService, private courseService: CourseService, private studentService: StudentService) {}

  ngOnInit() {
    this.getCourses();
    this.getStudents();
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error getting courses:', error);
      }
    );
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error getting students:', error);
      }
    );
  }

  onSubmit() {
    // Find the selected course and student objects from the courses and students arrays
    const selectedCourse = this.courses.find(course => course.courseName === this.result.course.courseName);
    const selectedStudent = this.students.find(student => student.firstName === this.result.student.firstName);

    // Check if both course and student are selected
    if (!selectedCourse || !selectedStudent) {
      console.error('Please select both Course and Student.');
      return;
    }

    // Set the course and student objects with their IDs in the result object
    this.result.course = selectedCourse;
    this.result.student = selectedStudent;

    this.resultService.addResult(this.result).subscribe(
      (result) => {
        console.log('New result added:', result);
        this.showNotification = true;
        this.result = { score: '', course: { courseName: '' }, student: { firstName: '', lastName: '' } };
      },
      (error) => {
        console.error('Error adding result:', error);
      }
    );
  }
}
