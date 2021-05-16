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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    StudentComponent,
    ContactusComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EmployeeRoutingModule,
    StudentRoutingModule,
    FormsModule
  ],
  providers: [EmployeesService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
