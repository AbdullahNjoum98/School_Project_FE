import { FavcourseVM } from './favcourse';
export interface StudentVM {
  id:number,
  name:string,
  email:string,
  phone:string,
  favCourse:FavcourseVM;
}
