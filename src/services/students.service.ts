import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Student } from '../interfaces/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API:string='Students'
  constructor(private apiService:ApiService) { }
  getAllStudents():Observable<Student[]>{
    return this.apiService.get<Student[]>(this.API);
  }
  getStudentById(id:string):Observable<Student>{
    return this.apiService.get<Student>(this.API+'/'+id);
  }

  addStudent(student:Student):Observable<Student>{
    return this.apiService.post<Student>(this.API,student);
  }
  editStudent(student:Student):Observable<Student>{
    return this.apiService.put<Student>(this.API,student);
  }
  deleteStudent(id:number){
    return this.apiService.delete<Student>(this.API+'/'+id);
  }
}
