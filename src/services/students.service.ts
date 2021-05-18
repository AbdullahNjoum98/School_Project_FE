import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StudentVM } from '../interfaces/studentVM';
import { Observable } from 'rxjs';
import { StudentResource } from 'src/interfaces/studentResource';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API = 'Students';
  constructor(private apiService: ApiService) { }
  getAllStudents(): Observable<StudentResource[]> {
    return this.apiService.get<StudentResource[]>(this.API);
  }
  getStudentById(id: string): Observable<StudentResource> {
    return this.apiService.get<StudentResource>(this.API + '/' + id);
  }

  addStudent(student: StudentVM): Observable<StudentResource> {
    return this.apiService.post<StudentVM>(this.API, student);
  }
  editStudent(student: StudentVM): Observable<StudentResource> {
    return this.apiService.put<StudentVM>(this.API, student);
  }
  deleteStudent(id: number): Observable<string> {
    return this.apiService.delete<StudentVM>(this.API + '/' + id);
  }
}
