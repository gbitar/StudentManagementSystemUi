import { Component } from '@angular/core';
import { StudentService } from '../student/student.service';
import { StudentWithoutId } from '../student/student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student: StudentWithoutId = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    emailAddress: ''
  };
  isInvalidEmail: boolean = false;
  isInvalidDateOfBirth: boolean = false;

  constructor(private studentService: StudentService) {}

  onSubmit() {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.student.emailAddress)) {
      this.isInvalidEmail = true;
      return;
    } else {
      this.isInvalidEmail = false;
    }

    // Validate date of birth
    const currentDate = new Date();
    const dob = new Date(this.student.dateOfBirth);
    const diffInYears = (currentDate.getTime() - dob.getTime()) / (1000 * 3600 * 24 * 365);
    if (isNaN(diffInYears) || diffInYears < 10) {
      this.isInvalidDateOfBirth = true;
      return;
    } else {
      this.isInvalidDateOfBirth = false;
    }

    // If email and date of birth are valid, add the student
    this.studentService.addStudent(this.student).subscribe(
      (student) => {
        console.log('New student added:', student);
        this.student = { firstName: '', lastName: '', dateOfBirth: new Date(), emailAddress: '' };
        },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }
}
