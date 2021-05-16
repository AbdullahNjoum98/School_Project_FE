import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../interfaces/employee';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Employee[]=[];
  Name:string='';
  Email:string='';
  Phone:string='';
  Salary:number=0;
  Id:any;
  AddOrEdit: string ='Add';
  emailRegex = RegExp(
    /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
  );
  phoneRegex= RegExp(
    /^[0-9]{10}$/
  );
  showDialog: boolean=false;
  constructor(public employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(e=>{
    e.forEach(item=>
      {
        this.employees.push(item);
      })
    });
  }
  onAddClick(){
    this.Name="";
    this.Email="";
    this.Phone="";
    this.Salary=0;
    this.showDialog=true;
  }
addEmp(){
  if(this.Name.trim()==''|| this.Email.trim()=='' ||
     this.Phone.trim()=='' || this.Salary==0){
    alert('Enter All Required Feilds')
  }
  else if(this.Name.trim().length<5){
    alert('Name should contains 5 letters at least');
  }
  else if(!this.emailRegex.test(String(this.Email).toLowerCase()))
  {
    alert('Invalid Email Address');
  }
  else if(!this.phoneRegex.test(String(this.Phone).toLowerCase()))
  {
    alert('Invalid Phone Number (should be 10 number digits)');
  }
  else if(this.Salary<1000 || this.Salary>9999){
    alert('Salary should be in the range (1000 - 9999)');
  } 
  else{
    let emp:Employee={
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
    this.employees.push(emp);
    });
    this.showDialog=!this.showDialog;
  }
}
onEditClick(emp:Employee){
  this.AddOrEdit='Edit';
  this.Id=emp.id;
  this.Name=emp.name;
  this.Email=emp.email;
  this.Phone=emp.phone;
  this.Salary=emp.salary;
}
editEmp(){
  if(this.Name.trim()==''|| this.Email.trim()=='' ||
     this.Phone.trim()=='' || this.Salary==0){
    alert('Enter All Required Feilds')
  }
  else if(this.Name.trim().length<5){
    alert('Name should contains 5 letters at least');
  }
  else if(!this.emailRegex.test(String(this.Email).toLowerCase()))
  {
    alert('Invalid Email Address');
  }
  else if(!this.phoneRegex.test(String(this.Phone).toLowerCase()))
  {
    alert('Invalid Phone Number (should be 10 number digits)');
  }
  else if(this.Salary<1000 || this.Salary>9999){
    alert('Salary should be in the range (1000 - 9999)');
  } 
  else{
  let emp:Employee={
      id:this.Id,
      email:this.Email,
      name:this.Name,
      phone:this.Phone,
      salary:this.Salary
  };
  
  //Reflect changes on Database
  this.employeeService.editEmployee(emp).subscribe(() =>
    {
      alert("Employee has been Edited Successfully!");
      //Reflect changes on UI
      this.employees.filter(e=>e.id!=emp.id);
      this.employees.push(emp);
    });
    this.showDialog=!this.showDialog;
  }
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
