import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import {AddEditStudentComponent} from '../add-edit-student/add-edit-student.component';
import { AddEditTeacherComponent } from '../add-edit-teacher/add-edit-teacher.component';

const routes:Routes=[
  {
    path:'',
    component:TeacherComponent
  },
  {
    path:'addeditteacher/:id',
    component:AddEditTeacherComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
