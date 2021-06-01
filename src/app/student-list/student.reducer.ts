import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { StudentListActions } from "./action-types";

export interface StudentState{
    students : any;
};
export const initialStudentState : StudentState = {
    students : []
};
export const studentListReducer = createReducer(
    initialStudentState,
    on(StudentListActions.allStudentsLoaded, (state, action) => {
        return{
            students: action.students
        }
    })
)