import { createSelector } from "@ngrx/store";

// export const AllCourses = createSelector (
//     state => state['students'],
//     (students) => {
//         students.map(student => {
//             student.favCourseString = '';
//             student.favCourses.forEach(course => {
//               if (student.favCourseString[student.favCourseString.length - 1] === ',')
//                 student.favCourseString.slice(1);
//               student.favCourseString = student.favCourseString + course.name + ',';
//             })
//             return student;
//           })
//     }
// );