import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TeacherResource } from '../interfaces/teacher-resource';
import { Observable } from 'rxjs';
import { TeacherVM } from '../interfaces/teacher-vm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private API = 'Teachers';
  constructor(private apiService: ApiService) { }
  getAllTeachers(): Observable<TeacherResource[]> {
    return this.apiService.get<TeacherResource[]>(this.API, environment.TeacherHost);
  }
  getTeacherById(id: string): Observable<TeacherResource> {
    return this.apiService.get<TeacherResource>(this.API + '/' + id, environment.TeacherHost);
  }

  addTeacher(student: TeacherVM): Observable<TeacherResource> {
    return this.apiService.post<TeacherVM>(this.API, environment.TeacherHost, student);
  }
  editTeacher(student: TeacherVM): Observable<TeacherResource> {
    return this.apiService.put<TeacherVM>(this.API, environment.TeacherHost, student);
  }
  deleteTeacher(id: number): Observable<string> {
    return this.apiService.delete<TeacherVM>(this.API + '/' + id, environment.TeacherHost);
  }
}
