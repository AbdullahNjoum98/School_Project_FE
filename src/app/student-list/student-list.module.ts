import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student-list.component';
import {AddEditStudentComponent} from '../student.form/student.form.component';
import { StudentReslover } from './student.resolver';
import { Actions, EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './students.effects';
import { StudentsService } from 'src/services/students.service';
import { StoreModule } from '@ngrx/store';
import { studentListReducer } from './student.reducer';

const routes:Routes=[
  {
    path:'',
    component:StudentComponent,
    resolve: {
      students: StudentReslover
    }
  },
  {
    path:'addeditstudent/:id',
    component:AddEditStudentComponent
  }
];
@NgModule({
  imports: [
     RouterModule.forChild(routes),
     EffectsModule.forFeature([StudentsEffects]),
     StoreModule.forFeature(
       'students',
       studentListReducer
     )
  ],
  exports: [RouterModule],
  providers: [ StudentsService, StudentReslover]
})
export class StudentRoutingModule { }
