import { Component, OnInit } from '@angular/core';
import { FavCourseVM } from '../../interfaces/favcourseVM';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavCourseResource } from 'src/interfaces/fav-course-resource';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './course.form.component.html',
  styleUrls: ['./course.form.component.css']
})
export class AddEditCourseComponent implements OnInit {


  error = '';
  AddOrEdit = 'Add';
  Id = 0;
  Name = '';
  Code = '';
  courses: FavCourseResource[] = [];
  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
    this.Id = +this.route.snapshot.params['id'];
    if (this.Id) {
      this.AddOrEdit = 'Edit';
      this.coursesService.getCourseById(this.Id + '').subscribe(e => {
        this.Name = e.name;
        this.Code = e.code;
      });
    }
  }
  processCourse(process: string): void {
    if (process === 'Add') {
      if (this.Name.trim() === '' || this.Code.trim() === '') {
        this.error = 'Enter All Required Feilds';
      }
      else if (this.Name.trim().length < 5) {
        this.error = 'Name should contains 5 letters at least';
      }
      else if (this.Code.trim().length < 3) {
        this.error = 'Code should contains 3 letters at least';
      }

      else {
        const course: FavCourseVM = {
          id: 0,
          name: this.Name,
          code: this.Code
        };
        // Add employee to Database
        this.coursesService.addCourse(course).subscribe(item => {
          // Add employee to UI
          this.courses.push(item);
          this.router.navigate(['courses']);
        },
          err => {
            alert(err.error);
          });
      }
    }
    else if (process === 'Edit') {
      if (this.Name.trim() === '' || this.Code.trim() === '') {
        this.error = 'Enter All Required Feilds';
      }
      else if (this.Name.trim().length < 5) {
        this.error = 'Name should contains 5 letters at least';
      }
      else if (this.Code.trim().length < 3) {
        this.error = 'Code should contains 3 letters at least';
      }
      else {
        this.courses.filter(e => e.id !== this.Id);
        const course: FavCourseVM = {
          id: this.Id,
          name: this.Name,
          code: this.Code
        };

        // Reflect changes on Database
        this.coursesService.editCourse(course).subscribe(item => {
          alert("Course has been Edited Successfully!");
          // Reflect changes on UI
          this.courses.push(item);
          this.router.navigate(['courses']);
        },
          err => {
            this.courses.push(course);
            alert(err.error);
          });
      }
    }
  }
}