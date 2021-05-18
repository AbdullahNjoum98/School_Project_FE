import { Component, OnInit } from '@angular/core';
import { StudentVM } from 'src/interfaces/studentVM';
import { StudentsService } from '../../services/students.service';
import { FavCourseVM } from '../../interfaces/favcourseVM';
import { StudentResource } from '../../interfaces/studentResource';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  items:any=[];

  constructor(private studentService:StudentsService) { }

  students:StudentResource[]=[];
  Name:string='';
  Email:string='';
  Phone:string='';
  FavCourseName: string='';
  Id:any;
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(e=>{
      e.forEach(item=>
        {
          item.favCourseString='';
          item.favCourses.forEach(e=>{
            item.favCourseString = e.name + ',';
          });
          debugger;
          this.students.push(item);
        })
      });
  }
  onAddClick(){
    this.Name="";
    this.Email="";
    this.Phone="";
    this.FavCourseName="";
  }

onEditClick(student:StudentVM){
  this.Id = student.id;
  this.Name = student.name;
  this.Email = student.email;
  this.Phone = student.phone;
  student.favCourses.forEach(element => {
    this.FavCourseName = this.FavCourseName + element.name + ',';
  });
}
deleteStudent(Id:number){
  //Reflect changes on Database
  this.studentService.deleteStudent(Id).subscribe(() =>
    {
      alert('Student has been Deleted Successfully!');
      //Reflect changes on UI
      let studentToBeDeleted= this.students.find(e=>e.id==Id);
      this.students=this.students.filter(e=>e != studentToBeDeleted);
    },
    err=>{
      alert(err.error);
    });
}
}
