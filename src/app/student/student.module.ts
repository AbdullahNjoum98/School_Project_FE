import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student-list/student-list.component';
import {AddEditStudentComponent} from './student.form/student.form.component';
import { StudentListReslover } from './student-list/student-list.resolver';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './students.effects';
import { StudentsService } from 'src/services/students.service';
import { StoreModule } from '@ngrx/store';
import { studentReducer } from './student.reducer';
import { StudentFormReslover } from './student.form/student.form.resolver';

const routes:Routes=[
  {
    path:'',
    component:StudentComponent,
    resolve: {
      students: StudentListReslover
    }
  },
  {
    path:'addeditstudent/:id',
    component:AddEditStudentComponent,
    resolve: {
      student: StudentFormReslover
    }
  }
];
@NgModule({
  imports: [
     RouterModule.forChild(routes),
     EffectsModule.forFeature([StudentsEffects]),
     StoreModule.forFeature(
       'studentState',
       studentReducer
     )
  ],
  exports: [RouterModule],
  providers: [ StudentsService, StudentFormReslover, StudentListReslover]
})
export class StudentRoutingModule { }
