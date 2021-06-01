import { FavCourseVM } from './favcourseVM';
import { TeacherVM } from './teacher-vm';
export interface StudentResource {
  id:number,
  name:string,
  email:string,
  phone:string,
  favCourses:FavCourseVM[],
  favCourseString: string,
  teacher:TeacherVM
}
