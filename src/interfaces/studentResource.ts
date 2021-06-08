import { FavCourseResource } from './fav-course-resource';
import { FavCourseVM } from './favcourseVM';
import { TeacherResource } from './teacher-resource';
import { TeacherVM } from './teacher-vm';
export interface StudentResource {
  id:number,
  name:string,
  email:string,
  phone:string,
  favCourses:FavCourseResource[],
  favCourseString: string,
  teacher:TeacherResource
}
