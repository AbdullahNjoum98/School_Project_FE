import { Component, OnInit } from '@angular/core';
import { StudentVM } from 'src/interfaces/student';
import { StudentsService } from '../../services/students.service';
import { FavcourseVM } from '../../interfaces/favcourse';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  items:any=[];

  constructor(private studentService:StudentsService) { }

  students:StudentVM[]=[];
  Name:string='';
  Email:string='';
  Phone:string='';
  FavCourseName: string='';
  Id:any;
  AddOrEdit:string='Add';
  emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  phoneRegex= RegExp(
    /^[0-9]{10}$/
  );
  showDialog: boolean=false;
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(e=>{
      e.forEach(item=>
        {
          this.students.push(item);
        })
      });
  }
  onAddClick(){
    this.Name="";
    this.Email="";
    this.Phone="";
    this.FavCourseName="";
    this.showDialog=true;
  }
addStudent(){
  if(this.Name.trim()==''|| this.Email.trim()=='' ||
     this.Phone=='' || this.FavCourseName.trim()==''){
    alert('Enter All Required Feilds');
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
  else{
  let student:StudentVM={
      id:0,
      email:this.Email,
      name:this.Name,
      phone:this.Phone,
      favCourse:
      {
        id:0,
        name:this.FavCourseName,
        code:this.FavCourseName
      }
  };
  //Add student to Database
  this.studentService.addStudent(student).subscribe(item =>
    {
    //Add student to UI
    this.students.push(student);
    });
    this.showDialog=!this.showDialog;
  }
}
onEditClick(student:StudentVM){
  this.AddOrEdit='Edit';
  this.Id=student.id;
  this.Name=student.name;
  this.Email=student.email;
  this.Phone=student.phone;
  this.FavCourseName = student.favCourse.name;
}
editStudent(){
  if(this.Name.trim()==''|| this.Email.trim()=='' ||
     this.Phone =='' || this.FavCourseName==''){
    alert('Enter All Required Feilds');
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
  else{
  let student:StudentVM={
      id:this.Id,
      email:this.Email,
      name:this.Name,
      phone:this.Phone,
      favCourse:
      {
        id:0,
        name:this.FavCourseName,
        code:this.FavCourseName
      }
  };
  //Reflect changes on Database
  this.studentService.editStudent(student).subscribe(() =>
    {
      alert("Student has been Edited Successfully!");
      //Reflect changes on UI
      this.students.filter(e=>e!=student);
      this.students.push(student);
    });
    this.showDialog=!this.showDialog;
  }
}
deleteStudent(Id:number){
  //Reflect changes on Database
  this.studentService.deleteStudent(Id).subscribe(() =>
    {
      alert('Student has been Deleted Successfully!');
      //Reflect changes on UI
      let studentToBeDeleted= this.students.find(e=>e.id==Id);
      this.students=this.students.filter(e=>e != studentToBeDeleted);
    });
}
}
