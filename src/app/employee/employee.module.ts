import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { AddEditComponent } from '../add-edit/add-edit.component';
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
