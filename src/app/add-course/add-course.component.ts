import { Component } from '@angular/core';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseName: string;

  constructor(private courseService: CourseService) {
    this.courseName = '';
  }

  onSubmit() {
    // Check if the course name is not empty before adding
    if (this.courseName && this.courseName.trim() !== '') {
      const newCourse: { courseName: string } = {
        courseName: this.courseName.trim()
      };

      this.courseService.addCourse(newCourse).subscribe(
        (course) => {
          // Clear the form after successful addition
          this.courseName = '';
          console.log('New course added:', course);
        },
        (error) => {
          console.error('Error adding course:', error);
        }
      );
    }
  }
}
