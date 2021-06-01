import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { StudentResource } from '../../interfaces/studentResource';
import { select, Store } from '@ngrx/store';
import { StudentState } from './student.reducer';
import { map } from 'rxjs/operators';
import { AppState } from '../reducers';

@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentComponent implements OnInit {



  public sts: StudentResource[] = [];
  constructor(private studentService: StudentsService, private store: Store<StudentState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(state => state)
    ).subscribe((stuedntsArr) => {
      this.sts = stuedntsArr.students['students'];
    }
    )
  }
  deleteStudent(Id: number): void {
    // Reflect changes on Database
    this.studentService.deleteStudent(Id).subscribe(() => {
      alert('Student has been Deleted Successfully!');
      // Reflect changes on UI
      const studentToBeDeleted = this.sts.find(e => e.id === Id);
      this.sts = this.sts.filter(e => e !== studentToBeDeleted);
    },
      err => {
        alert(err.error);
      });
  }
}
