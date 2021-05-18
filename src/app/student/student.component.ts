import { Component, OnInit } from '@angular/core';
import { StudentVM } from 'src/interfaces/studentVM';
import { StudentsService } from '../../services/students.service';
import { FavCourseVM } from '../../interfaces/favcourseVM';
import { StudentResource } from '../../interfaces/studentResource';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  items: any = [];

  constructor(private studentService: StudentsService) { }

  students: StudentResource[] = [];
  Name = '';
  Email = '';
  Phone = '';
  FavCourseName = '';
  Id: any;
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(e => {
      e.forEach(student => {
        student.favCourseString = '';
        student.favCourses.forEach(course => {
          student.favCourseString = student.favCourseString + course.name + ', ';
        });
        this.students.push(student);
      });
    });
  }
  onAddClick(): void{
    this.Name = '';
    this.Email = '';
    this.Phone = '';
    this.FavCourseName = '';
  }

  onEditClick(student: StudentResource): void {
    this.Id = student.id;
    this.Name = student.name;
    this.Email = student.email;
    this.Phone = student.phone;
    student.favCourses.forEach(element => {
      this.FavCourseName = this.FavCourseName + element.name + ',';
    });
  }
  deleteStudent(Id: number): void {
    // Reflect changes on Database
    this.studentService.deleteStudent(Id).subscribe(() => {
      alert('Student has been Deleted Successfully!');
      // Reflect changes on UI
      const studentToBeDeleted = this.students.find(e => e.id === Id);
      this.students = this.students.filter(e => e !== studentToBeDeleted);
    },
      err => {
        alert(err.error);
      });
  }
}
