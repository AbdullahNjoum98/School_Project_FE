import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  {
    path:'',
    component:MainpageComponent
  }
  ,{
    path:'contactus',
    component:ContactusComponent
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./employee/employee.module").then(
        (module) => module.EmployeeRoutingModule
      ),
  },
  {
    path:'students',
    loadChildren:()=>
    import("./student/student.module").then(
      (module)=> module.StudentRoutingModule
    )
  },
  {
    path:'teachers',
    loadChildren:()=>
    import("./teacher/teacher.module").then(
      (module)=> module.TeacherRoutingModule
    )
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./course/course.module").then(
        (module) => module.CourseRoutingModule
      ),
  },
  {
    path : '**',
    redirectTo : '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
