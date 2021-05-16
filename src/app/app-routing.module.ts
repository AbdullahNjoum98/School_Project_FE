import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
