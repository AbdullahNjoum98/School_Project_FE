import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses-list.component';
import { NgModule } from '@angular/core';
import { AddEditCourseComponent } from '../course.form/course.form.component';
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
