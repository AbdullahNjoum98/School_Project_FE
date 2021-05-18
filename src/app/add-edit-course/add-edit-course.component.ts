import { Component, OnInit } from '@angular/core';
import { FavCourseVM } from '../../interfaces/favcourseVM';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {


  error:string="";
  AddOrEdit="Add";
  Id:any=0;
  Name: string="";
  Code: string="";
  courses:any[]=[];
  constructor(private coursesService:CoursesService, private route: ActivatedRoute, private router:Router) { }
  
  ngOnInit(): void {
    this.Id=this.route.snapshot.params['id'];
    if(this.Id!=0){
      this.AddOrEdit="Edit";
      this.coursesService.getCourseById(this.Id).subscribe(e=>{
        this.Name=e.name;
        this.Code=e.code;
      });
    }
  }
  addCourse(){
    if(this.Name.trim()==''|| this.Code.trim()==''){
      this.error='Enter All Required Feilds';
    }
    else if(this.Name.trim().length<5){
      this.error='Name should contains 5 letters at least';
    }
    else if(this.Code.trim().length<3){
      this.error='Code should contains 3 letters at least';
    }
    
    else{
      let course:FavCourseVM={
        id:0,
        name:this.Name,
        code:this.Code
      };
    //Add employee to Database
    this.coursesService.addCourse(course).subscribe(item =>
      {
      //Add employee to UI
      this.courses.push(item);
    this.router.navigate(['courses']);
      },
      err=>{
        alert(err.error);
      });
    }
  }
  editCourse(){
    if(this.Name.trim()==''|| this.Code.trim()==''){
      this.error='Enter All Required Feilds';
    }
    else if(this.Name.trim().length<5){
      this.error='Name should contains 5 letters at least';
    }
    else if(this.Code.trim().length<3){
      this.error='Code should contains 3 letters at least';
    }
    else{
    this.courses.filter(e=>e.id!=this.Id);
    let course:FavCourseVM={
        id:this.Id,
        name:this.Name,
        code:this.Code
      };
    
    //Reflect changes on Database
    this.coursesService.editCourse(course).subscribe(item =>
      {
        alert("Course has been Edited Successfully!");
        //Reflect changes on UI
        this.courses.push(item);
        this.router.navigate(['courses']);
      },
      err=>{
        this.courses.push(course);
        alert(err.error);
      });
    }
  }

}
