import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { EmployeeVM } from '../../interfaces/employeeVM';
@Component({
  selector: 'app-employee',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:EmployeeVM[]=[];
  Name = '';
  Email = '';
  Phone = '';
  Salary = 0;
  Id = 0;
  constructor(public employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(e=>{
    e.forEach(item=>
      {
        this.employees.push(item);
      })
    });
  }
  
deleteEmp(Id:number){
  //Reflect changes on Database
  this.employeeService.deleteEmployee(Id).subscribe(() =>
    {
      alert('Employee has been Deleted Successfully!');
      //Reflect changes on UI
      let empToBeDeleted= this.employees.find(e=>e.id==Id);
      this.employees=this.employees.filter(e=>e != empToBeDeleted);
    });
}
}
