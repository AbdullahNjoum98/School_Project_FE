import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { TeacherVM } from '../../interfaces/teacher-vm';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: TeacherVM[] = [];
  Name = '';
  Code = '';
  Id: any;
  constructor(public teachersService: TeachersService) { }

  ngOnInit(): void {
    this.teachersService.getAllTeachers().subscribe(e => {
      e.forEach(item => {
        this.teachers.push(item);
      })
    },
      err => {
        alert(err.error);
      });
  }


  deleteTeacher(Id: number): void {
    // Reflect changes on Database
    this.teachersService.deleteTeacher(Id).subscribe(() => {
      alert('Course has been Deleted Successfully!');
      // Reflect changes on UI
      const teacherToBeDeleted = this.teachers.find(e => e.id === Id);
      this.teachers = this.teachers.filter(e => e !== teacherToBeDeleted);
    },

      err => {
        alert(err.error);
      }
    );
  }

}
