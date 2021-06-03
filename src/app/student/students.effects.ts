import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { FavCourseResource } from "src/interfaces/fav-course-resource";
import { StudentResource } from "src/interfaces/studentResource";
import { TeacherVM } from "src/interfaces/teacher-vm";
import { CoursesService } from "src/services/courses.service";
import { StudentsService } from "src/services/students.service";
import { TeachersService } from "src/services/teachers.service";
import { StudentListActions } from "./action-types";
import { allStudentsFailed, allStudentsLoaded, studentDeleted, studentDeletingFailed, studentUpdated, studentUpdatingFailed } from "./student.actions";

@Injectable()
export class StudentsEffects {
    constructor(private studentsService: StudentsService, private teacherService: TeachersService, private coursesService: CoursesService, private actions$: Actions) { }
    loadStudents$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.loadAllStudents),
                switchMap((action) =>
                    this.studentsService.getAllStudents().pipe(
                        map((studentArray: StudentResource[]) => {
                            studentArray.forEach(student => {
                                student.favCourseString = '';
                                student.favCourses.forEach(e => {
                                    student.favCourseString = student.favCourseString + e.name + ',';
                                });
                            })
                            return StudentListActions.allStudentsLoaded({ students: studentArray })
                        }
                        ),
                        catchError((errorMsg: string) =>
                            of(StudentListActions.allStudentsFailed({ payload: { error: errorMsg } }))
                        )
                    )
                )
            )
    )
    deleteStudent$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.deleteStudent),
                switchMap(action =>
                    this.studentsService.deleteStudent(action.studentId).pipe(
                        map(() =>
                            StudentListActions.studentDeleted({ studentId: action.studentId })
                        ),
                        catchError((errorMsg: string) => {
                            alert(errorMsg);
                            return of(StudentListActions.studentDeletingFailed({ error: errorMsg }))
                        }
                        )

                    )
                )
            )
    )
    updateStudent$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.updateStudent),
                switchMap(action =>
                    this.studentsService.editStudent(action.student).pipe(
                        map((studentEntity) => {
                            let student: StudentResource = { id: 0, favCourseString: '', email: '', name: '', phone: '', teacher: { id: 0, degree: '', name: '' }, favCourses: [] };
                            let teacherEnitity: TeacherVM = { id: 0, degree: '', name: '' };
                            let courseEntities: FavCourseResource[] = [];
                            let coursesString = '';
                            this.teacherService.getTeacherById(action.student.teacher + '').pipe(
                                map(teacher => teacherEnitity = teacher)
                            )
                            this.coursesService.getAllCourses().pipe(
                                map((courses) => {
                                    courseEntities = courses.filter(e => action.student.favCourses.includes(e.id));
                                    courseEntities.map((item) => coursesString = coursesString + item.name + ',')
                                    return courseEntities;
                                }
                                )
                            )
                            student = {
                                email: studentEntity.email,
                                name: studentEntity.name,
                                id: studentEntity.id,
                                phone: studentEntity.phone,
                                teacher: teacherEnitity,
                                favCourses: courseEntities,
                                favCourseString: coursesString
                            }
                            return StudentListActions.studentUpdated({ student: { id: student.id, changes: student } });
                        }),
                        catchError((errorMsg) => {
                            alert(errorMsg)
                            return of(StudentListActions.studentUpdatingFailed({ error: errorMsg }))
                        })
                    )
                )
            )
    )
}