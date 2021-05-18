import { FavCourseVM } from './favcourseVM';
export interface StudentVM {
  id:number,
  name:string,
  email:string,
  phone:string,
  favCourses:FavCourseVM[];
}
