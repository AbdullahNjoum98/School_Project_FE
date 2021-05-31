import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FavCourseVM } from 'src/interfaces/favcourseVM';
import { FavCourseResource } from 'src/interfaces/fav-course-resource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private API:string='Courses'
  constructor(private apiService:ApiService) { }
  getAllCourses():Observable<FavCourseResource[]>{
    return this.apiService.get<FavCourseResource[]>(this.API, environment.Host);
  }
  getCourseById(id:string):Observable<FavCourseResource>{
    return this.apiService.get<FavCourseResource>(this.API+'/'+id, environment.Host);
  }

  addCourse(course:FavCourseVM):Observable<FavCourseResource>{
    debugger;
    return this.apiService.post<FavCourseVM>(this.API, environment.Host, course);
  }
  editCourse(course:FavCourseVM):Observable<FavCourseResource>{
    return this.apiService.put<FavCourseVM>(this.API, environment.Host, course);
  }
  deleteCourse(id:number): Observable<string>{
    return this.apiService.delete<FavCourseVM>(this.API+'/'+id, environment.Host);
  }
}
