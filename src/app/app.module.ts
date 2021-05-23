import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { StudentComponent } from './student/student.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeeRoutingModule } from './employee/employee.module';
import { StudentRoutingModule } from './student/student.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ApiService } from 'src/services/api.service';
import { EmployeesService } from 'src/services/employees.service';
import { FormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { CourseComponent } from './course/course.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { TeacherComponent } from './teacher/teacher.component';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';

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
    BrowserAnimationsModule
  ],
  providers: [EmployeesService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
