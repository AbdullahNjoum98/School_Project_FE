import { Component, OnInit } from '@angular/core';
import { StudentVM } from '../../interfaces/studentVM';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { FavCourseVM } from '../../interfaces/favcourseVM';
import { StudentResource } from '../../interfaces/studentResource';
import { TeacherVM } from 'src/interfaces/teacher-vm';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './student.form.component.html',
  styleUrls: ['./student.form.component.css']
})
export class AddEditStudentComponent implements OnInit {

  courses: FavCourseVM[] = [];
  teachers: TeacherVM[] = [];
  selectedCourses: number[] = [];
  selectedTeacher: number = 0;
  error = '';
  AddOrEdit = 'Add';
  Id = 0;
  Name = '';
  Email = '';
  favCourse = '';
  Phone = '';
  students: StudentResource[] = [];
  emailRegex = RegExp(
    /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
  );
  phoneRegex = RegExp(
    /^[0-9]{10}$/
  );
  constructor(private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router,
    public courseService: CoursesService,
    public teachersService: TeachersService) { }

  ngOnInit(): void {
    debugger;
    this.Id = +this.route.snapshot.params['id'];
    if (this.Id !== 0) {
      this.AddOrEdit = 'Edit';
      this.studentsService.getStudentById(this.Id + '').subscribe(e => {
        this.Name = e.name;
        this.Phone = e.phone;
        this.Email = e.email;
        this.selectedCourses = this.getIds(e.favCourses);
        this.selectedTeacher = e.teacher.id;
      });
    }
    this.courseService.getAllCourses().subscribe(e => {
      e.forEach(item => {
        this.courses.push(item);
      })
    },
      err => {
        alert(err.error);
      });
    this.teachersService.getAllTeachers().subscribe(e => {
      e.forEach(item => {
        this.teachers.push(item);
      })
    },
      err => {
        alert(err.error);
      });
  }
  getIds(entities: any[]): number[] {

    const Ids: number[] = [];
    entities.forEach(entity => {
      Ids.push(entity.id);
    });
    return Ids;
  }
  processStud(process: string): void {
    if (process === 'Add') {
      if (this.Name.trim() === '' || (this.Email.trim() === '' &&
      this.Phone.trim() === '')) {
        this.error = 'Enter All Required Feilds';
      }
      else if (this.Name.trim().length < 5) {
        this.error = 'Name should contains 5 letters at least';
      }
      else if (this.Email && !this.emailRegex.test(String(this.Email).toLowerCase())) {
        this.error = 'Invalid Email Address';
      }
      else if (this.Phone && !this.phoneRegex.test(String(this.Phone).toLowerCase())) {
        this.error = 'Invalid Phone Number (should be 10 number digits)';
      }
      else if (!this.selectedCourses.length) {
        this.error = 'Please Select a Course At least';
      }
      else if (!this.selectedTeacher) {
        this.error = 'Please Select a Teacher';
      }
      else {
        const student: StudentVM = {
          id: 0,
          email: this.Email,
          name: this.Name,
          phone: this.Phone,
          favCourses: this.selectedCourses.slice(),
          teacher: this.selectedTeacher
        };
        // Add employee to Database
        this.studentsService.addStudent(student).subscribe(item => {
          // Add employee to UI
          this.students.push(item);
          this.router.navigate(['students']);
        },
          err => {
            alert(err.error);
          });
      }
    }
    else if (process === 'Edit') {
      if (this.Name.trim() === '' || (this.Email.trim() === '' &&
        this.Phone.trim() === '')) {
        this.error = 'Enter All Required Feilds';
      }
      else if (this.Name.trim().length < 5) {
        this.error = 'Name should contains 5 letters at least';
      }
      else if (this.Email && !this.emailRegex.test(String(this.Email).toLowerCase())) {
        this.error = 'Invalid Email Address';
      }
      else if (this.Phone && !this.phoneRegex.test(String(this.Phone).toLowerCase())) {
        this.error = 'Invalid Phone Number (should be 10 number digits)';
      }
      else if (!this.selectedCourses.length) {
        this.error = 'Please Select a Course At least';
      }
      else if (!this.selectedTeacher) {
        this.error = 'Please Select a Teacher';
      }
      else {
        this.students.filter(e => e.id !== this.Id);
        const student: StudentVM = {
          id: this.Id,
          email: this.Email,
          name: this.Name,
          phone: this.Phone,
          favCourses: this.selectedCourses,
          teacher: this.selectedTeacher
        };

        // Reflect changes on Database
        this.studentsService.editStudent(student).subscribe(item => {
          alert('Student has been Edited Successfully!');
          // Reflect changes on UI
          this.students.push(item);
          this.router.navigate(['students']);
        },
          err => {
            alert(err.error);
          });
      }
    }
  }
}
