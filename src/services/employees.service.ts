import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EmployeeVM } from 'src/interfaces/employee';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private API:string='Employees'
  constructor(private apiService:ApiService) { }
  getAllEmployees():Observable<EmployeeVM[]>{
    return this.apiService.get<EmployeeVM[]>(this.API);
  }
  getEmployeeById(id:string):Observable<EmployeeVM>{
    return this.apiService.get<EmployeeVM>(this.API+'/'+id);
  }

  addEmployee(employee:EmployeeVM):Observable<EmployeeVM>{
    debugger;
    return this.apiService.post<EmployeeVM>(this.API,employee);
  }
  editEmployee(emloyee:EmployeeVM):Observable<EmployeeVM>{
    return this.apiService.put<EmployeeVM>(this.API,emloyee);
  }
  deleteEmployee(id:number){
    return this.apiService.delete<EmployeeVM>(this.API+'/'+id);
  }
}
