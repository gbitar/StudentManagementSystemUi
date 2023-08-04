import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentWithoutId } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Method to fetch the list of students from the backend
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  // Method to delete a student by ID
  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${studentId}`);
  }

  addStudent(student: StudentWithoutId): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/students`, student);
  }
}
