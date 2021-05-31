import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { MainpageComponent } from './mainpage/mainpage.component';

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
      import("./employees-list/employees-list.module").then(
        (module) => module.EmployeeRoutingModule
      ),
  },
  {
    path:'students',
    loadChildren:()=>
    import("./student-list/student-list.module").then(
      (module)=> module.StudentRoutingModule
    )
  },
  {
    path:'teachers',
    loadChildren:()=>
    import("./teachers-list/teachers-list.module").then(
      (module)=> module.TeacherRoutingModule
    )
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses-list/courses-list.module").then(
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
