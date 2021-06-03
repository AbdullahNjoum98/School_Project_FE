import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teachers-list.component';
import { AddEditTeacherComponent } from '../teacher.form/teacher.form.component';

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
