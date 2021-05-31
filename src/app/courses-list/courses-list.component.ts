import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FavCourseVM } from '../../interfaces/favcourseVM';

@Component({
  selector: 'app-course',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CourseComponent implements OnInit {

  courses: FavCourseVM[] = [];
  Name = '';
  Code = '';
  Id: any;
  constructor(public courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses()
    .subscribe(e => {
      this.courses = e.map(item => {
        return item;
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