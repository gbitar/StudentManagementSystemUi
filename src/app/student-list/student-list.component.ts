import { Component, OnInit } from '@angular/core';
import { Student } from '../student/student'; // Import the Student model/interface
import { StudentService } from '../student/student.service'; // Import the StudentService

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        this.students = this.students.filter((student) => student.id !== studentId);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}
