import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StudentVM } from '../interfaces/studentVM';
import { Observable } from 'rxjs';
import { StudentResource } from 'src/interfaces/studentResource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API = 'Students';
  constructor(private apiService: ApiService) { }
  getAllStudents(): Observable<StudentResource[]> {
    return this.apiService.get<StudentResource[]>(this.API, environment.Host);
  }
  getStudentById(id: string): Observable<StudentResource> {
    return this.apiService.get<StudentResource>(this.API + '/' + id, environment.Host);
  }

  addStudent(student: StudentVM): Observable<StudentResource> {
    return this.apiService.post<StudentVM>(this.API, environment.Host, student);
  }
  editStudent(student: StudentVM): Observable<StudentResource> {
    return this.apiService.put<StudentVM>(this.API, environment.Host,student);
  }
  deleteStudent(id: number): Observable<string> {
    return this.apiService.delete<StudentVM>(this.API + '/' + id, environment.Host);
  }
}
