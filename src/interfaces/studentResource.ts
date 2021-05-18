import { FavCourseVM } from './favcourseVM';
export interface StudentResource {
  id:number,
  name:string,
  email:string,
  phone:string,
  favCourses:FavCourseVM[],
  favCourseString:string
}
