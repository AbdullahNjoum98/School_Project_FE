import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { EmployeeVM } from '../../interfaces/employeeVM';
import { FormsModule } from '@angular/forms';
import { FavCourseVM } from '../../interfaces/favcourseVM';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: FavCourseVM[] = [];
  Name = '';
  Code = '';
  Id: any;
  constructor(public courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(e => {
      e.forEach(item => {
        this.courses.push(item);
      })
    },
      err => {
        alert(err.error);
      });
  }


  deleteCourse(Id: number): void {
    // Reflect changes on Database
    this.courseService.deleteCourse(Id).subscribe(() => {
      alert('Course has been Deleted Successfully!');
      // Reflect changes on UI
      const courseToBeDeleted = this.courses.find(e => e.id === Id);
      this.courses = this.courses.filter(e => e !== courseToBeDeleted);
    },

      err => {
        alert(err.error);
      }
    );
  }
}