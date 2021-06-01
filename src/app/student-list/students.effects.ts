import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { StudentResource } from "src/interfaces/studentResource";
import { StudentsService } from "src/services/students.service";
import { StudentListActions } from "./action-types";
import { allStudentsLoaded } from "./student-list.actions";

@Injectable()
export class StudentsEffects {
    constructor(private studentsService: StudentsService, private actions$: Actions) { }
    loadStudents$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(StudentListActions.loadAllStudents),
                switchMap(action =>
                    this.studentsService.getAllStudents()
                ),
                map(students => {
                    console.log('students', students);
                    students.forEach(student => {
                        student.favCourseString='';
                        student.favCourses.forEach(e=>{
                            student.favCourseString = student.favCourseString + e.name + ',';
                        });
                    })
                    return allStudentsLoaded({ students });
                })
            )
    )
}