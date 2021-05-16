import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StudentVM } from '../interfaces/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API:string='Students'
  constructor(private apiService:ApiService) { }
  getAllStudents():Observable<StudentVM[]>{
    return this.apiService.get<StudentVM[]>(this.API);
  }
  getStudentById(id:string):Observable<StudentVM>{
    return this.apiService.get<StudentVM>(this.API+'/'+id);
  }

  addStudent(student:StudentVM):Observable<StudentVM>{
    return this.apiService.post<StudentVM>(this.API,student);
  }
  editStudent(student:StudentVM):Observable<StudentVM>{
    return this.apiService.put<StudentVM>(this.API,student);
  }
  deleteStudent(id:number){
    return this.apiService.delete<StudentVM>(this.API+'/'+id);
  }
}
