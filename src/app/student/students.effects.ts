import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { StudentResource } from "src/interfaces/studentResource";
import { StudentsService } from "src/services/students.service";
import { StudentListActions } from "./action-types";

@Injectable()
export class StudentsEffects {
    constructor(private studentsService: StudentsService, private actions$: Actions) { }
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
                        catchError((errorMassege) => {
                            alert(errorMassege.message);
                            return of(StudentListActions.allStudentsFailed({ error: errorMassege.message }))
                        }
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
                        catchError((errorMassege) => {
                            alert(errorMassege.message);
                            return of(StudentListActions.studentDeletingFailed({ error: errorMassege.message }))
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
                switchMap((action) =>
                    this.studentsService.editStudent(action.student).pipe(
                        map((studentEntity) => {
                            studentEntity.favCourseString=''
                            studentEntity.favCourses.forEach(course =>
                                studentEntity.favCourseString = studentEntity.favCourseString + course.name+ ','
                            )
                            return StudentListActions.studentUpdated({ student: { id: studentEntity.id, changes: studentEntity } });
                        }),
                        catchError((errorMassege) => {
                            alert(errorMassege.message)
                            return of(StudentListActions.studentUpdatingFailed({ error: errorMassege.message }))
                        })
                    )
                )
            )
    )
    addStudent$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.addStudent),
                switchMap(action =>
                    this.studentsService.addStudent(action.student).pipe(
                        map(student =>{
                            student.favCourseString=''
                            student.favCourses.forEach(course =>
                                student.favCourseString = student.favCourseString + course.name+ ','
                            )
                            return StudentListActions.studentAdded({ student: student })
                            }),
                        catchError((errorMassege) => {
                            alert(errorMassege.message);
                            return of(StudentListActions.studentAddingFailed({ error: errorMassege.message }))
                        }
                        )
                    )
                )
            )
    )
    loadStudent$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.loadStudent),
                switchMap(action =>
                    this.studentsService.getStudentById(action.id + '').pipe(
                        map(student =>
                            StudentListActions.studentLoaded({ student: student })
                        ),
                        catchError((errorMessage) => {
                            alert(errorMessage.message);
                            return of(StudentListActions.studentLoadingFailed({ error: errorMessage.message }))
                        })
                    ))
            )
    );
}