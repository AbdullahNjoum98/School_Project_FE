import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employees-list.component';
import { NgModule } from '@angular/core';
import { AddEditComponent } from '../employees.form/employees.form.component';
const routes: Routes = [
  {
    path: '', component: EmployeeComponent,
    
  },
  {
    path:'addedit/:id',
    component:AddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
