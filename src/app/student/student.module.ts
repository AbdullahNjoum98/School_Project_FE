import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import {AddEditStudentComponent} from '../add-edit-student/add-edit-student.component';

const routes:Routes=[
  {
    path:'',
    component:StudentComponent
  },
  {
    path:'addeditstudent/:id',
    component:AddEditStudentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
