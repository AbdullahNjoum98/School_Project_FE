import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EmployeeVM } from 'src/interfaces/employeeVM';
import { EmployeeResource } from 'src/interfaces/employeeResource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private API:string='Employees'
  constructor(private apiService:ApiService) { }
  getAllEmployees():Observable<EmployeeResource[]>{
    return this.apiService.get<EmployeeResource[]>(this.API, environment.Host);
  }
  getEmployeeById(id:string):Observable<EmployeeResource>{
    return this.apiService.get<EmployeeResource>(this.API+'/'+id, environment.Host);
  }

  addEmployee(employee:EmployeeVM):Observable<EmployeeResource>{
    debugger;
    return this.apiService.post<EmployeeVM>(this.API, environment.Host, employee);
  }
  editEmployee(emloyee:EmployeeVM):Observable<EmployeeResource>{
    return this.apiService.put<EmployeeVM>(this.API, environment.Host, emloyee);
  }
  deleteEmployee(id:number): Observable<string>{
    return this.apiService.delete<EmployeeVM>(this.API+'/'+id, environment.Host);
  }
}
