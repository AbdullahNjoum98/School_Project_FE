import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EmployeeVM } from 'src/interfaces/employeeVM';
import { HttpParams } from '@angular/common/http';
import { EmployeeResource } from 'src/interfaces/employeeResource';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private API:string='Employees'
  constructor(private apiService:ApiService) { }
  getAllEmployees():Observable<EmployeeResource[]>{
    return this.apiService.get<EmployeeResource[]>(this.API);
  }
  getEmployeeById(id:string):Observable<EmployeeResource>{
    return this.apiService.get<EmployeeResource>(this.API+'/'+id);
  }

  addEmployee(employee:EmployeeVM):Observable<EmployeeResource>{
    debugger;
    return this.apiService.post<EmployeeVM>(this.API,employee);
  }
  editEmployee(emloyee:EmployeeVM):Observable<EmployeeResource>{
    return this.apiService.put<EmployeeVM>(this.API,emloyee);
  }
  deleteEmployee(id:number): Observable<string>{
    return this.apiService.delete<EmployeeVM>(this.API+'/'+id);
  }
}
