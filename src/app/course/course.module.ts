import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { DropdownModule } from 'primeng/dropdown';
const routes: Routes = [
  {
    path: '', component: CourseComponent,
    
  },
  {
    path:'addeditcourse/:id',
    component:AddEditCourseComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DropdownModule
  ],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
