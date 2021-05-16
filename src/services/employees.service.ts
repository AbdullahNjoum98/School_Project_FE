import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Employee } from 'src/interfaces/employee';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private API:string='Employees'
  constructor(private apiService:ApiService) { }
  getAllEmployees():Observable<Employee[]>{
    return this.apiService.get<Employee[]>(this.API);
  }
  getEmployeeById(id:string):Observable<Employee>{
    return this.apiService.get<Employee>(this.API+'/'+id);
  }

  addEmployee(employee:Employee):Observable<Employee>{
    return this.apiService.post<Employee>(this.API,employee);
  }
  editEmployee(emloyee:Employee):Observable<Employee>{
    return this.apiService.put<Employee>(this.API,emloyee);
  }
  deleteEmployee(id:number){
    return this.apiService.delete<Employee>(this.API+'/'+id);
  }
}
