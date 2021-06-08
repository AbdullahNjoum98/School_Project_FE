import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { StudentResource } from '../../../interfaces/studentResource';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getAllStudents } from '../student.selectors';
import { StudentListActions } from '../action-types';

@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentComponent implements OnInit {
  sts: StudentResource[] = [];

  constructor(private studentService: StudentsService, private store: Store<AppState>) { }
  ngOnInit(): void {
      this.store.pipe(select(getAllStudents)).subscribe(studentsArr => {
        this.sts = <StudentResource[]>studentsArr
      }
      );
  }
  deleteStudent(studentId: number): void {
    this.store.dispatch(StudentListActions.deleteStudent({ studentId }))
  }
}
