import { Component, OnInit } from '@angular/core';
import { EmployeeVM } from '../../interfaces/employeeVM';
import { EmployeesService } from 'src/services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  error:string="";
  AddOrEdit="Add";
  Id:any=0;
  Name: any="";
  Email: any="";
  Salary: any=0;
  Phone: any="";
  employees:EmployeeVM[]=[]
  emailRegex = RegExp(
    /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
  );
  phoneRegex= RegExp(
    /^[0-9]{10}$/
  );
  constructor(private employeeService:EmployeesService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.Id=this.route.snapshot.params['id'];
    if(this.Id!=0){
      this.AddOrEdit="Edit";
      this.employeeService.getEmployeeById(this.Id).subscribe(e=>{
        this.Name=e.name;
        this.Phone=e.phone;
        this.Salary=e.salary;
        this.Email=e.email;
      });
    }
  }
  addEmp(){
    if(this.Name.trim()==''|| this.Email.trim()=='' ||
       this.Phone.trim()=='' || this.Salary==0){
      this.error='Enter All Required Feilds';
    }
    else if(this.Name.trim().length<5){
      this.error='Name should contains 5 letters at least';
    }
    else if(!this.emailRegex.test(String(this.Email).toLowerCase()))
    {
      this.error='Invalid Email Address';
    }
    else if(!this.phoneRegex.test(String(this.Phone).toLowerCase()))
    {
      this.error='Invalid Phone Number (should be 10 number digits)';
    }
    else if(this.Salary<1000 || this.Salary>9999){
      this.error='Salary should be in the range (1000 - 9999)';
    } 
    else{
      let emp:EmployeeVM={
        id:0,
        email:this.Email,
        name:this.Name,
        phone:this.Phone,
        salary:+this.Salary
    };
    //Add employee to Database
    this.employeeService.addEmployee(emp).subscribe(item =>
      {
      //Add employee to UI
      this.employees.push(item);
      this.router.navigate(['employees']);
      },
      err=>{
        alert(err.error);
      });
    }
  }
  editEmp(){
    if(this.Name.trim()==''|| this.Email.trim()=='' ||
       this.Phone.trim()=='' || this.Salary==0){
      this.error='Enter All Required Feilds';
    }
    else if(this.Name.trim().length<5){
      this.error='Name should contains 5 letters at least';
    }
    else if(!this.emailRegex.test(String(this.Email).toLowerCase()))
    {
      this.error='Invalid Email Address';
    }
    else if(!this.phoneRegex.test(String(this.Phone).toLowerCase()))
    {
      this.error='Invalid Phone Number (should be 10 number digits)';
    }
    else if(this.Salary<1000 || this.Salary>9999){
      this.error='Salary should be in the range (1000 - 9999)';
    } 
    else{
    this.employees.filter(e=>e.id!=this.Id);
    let emp:EmployeeVM={
        id:this.Id,
        email:this.Email,
        name:this.Name,
        phone:this.Phone,
        salary:this.Salary
    };
    
    //Reflect changes on Database
    this.employeeService.editEmployee(emp).subscribe(item =>
      {
        alert("Employee has been Edited Successfully!");
        //Reflect changes on UI
        this.employees.push(item);
    this.router.navigate(['employees']);
      },
      err=>{
        this.employees.push(emp);
        alert(err.error);
      });
    }
  }
}
