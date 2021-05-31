import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employees-list/employees-list.component';
import { StudentComponent } from './student-list/student-list.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeeRoutingModule } from './employees-list/employees-list.module';
import { StudentRoutingModule } from './student-list/student-list.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ApiService } from 'src/services/api.service';
import { EmployeesService } from 'src/services/employees.service';
import { FormsModule } from '@angular/forms';
import { AddEditComponent } from './employees.form/employees.form.component';
import { AddEditStudentComponent } from './student.form/student.form.component';
import { CourseComponent } from './courses-list/courses-list.component';
import { AddEditCourseComponent } from './course.form/course.form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { TeacherComponent } from './teachers-list/teachers-list.component';
import { AddEditTeacherComponent } from './teacher.form/teacher.form.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    StudentComponent,
    ContactusComponent,
    MainpageComponent,
    AddEditComponent,
    AddEditStudentComponent,
    CourseComponent,
    AddEditCourseComponent,
    TeacherComponent,
    AddEditTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EmployeeRoutingModule,
    StudentRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [EmployeesService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
