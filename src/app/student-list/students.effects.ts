import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { StudentsService } from "src/services/students.service";
import { StudentListActions } from "./action-types";
import { allStudentsLoaded } from "./student-list.actions";

@Injectable()
export class StudentsEffects {
    constructor(private studentsService: StudentsService, private actions$: Actions){}
    // loadStudents$ = createEffect(
    //     () => this.actions$
    //         .pipe(
    //             ofType(StudentListActions.loadAllStudents),
    //             concatMap(action=> 
    //                 this.studentsService.getAllStudents()
    //             ),
    //             map(students => allStudentsLoaded({students}))
    //         )
    // )
}