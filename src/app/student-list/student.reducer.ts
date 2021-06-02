import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { StudentListActions } from "./action-types";

export interface StudentState{
    students : StudentResource[];
};
export const initialStudentState : StudentState = {
    students : [] as StudentResource[],
};
export const studentListReducer = createReducer(
    initialStudentState,
    on(StudentListActions.allStudentsLoaded, (state, action) => {
        return{
            ...state,
            students: action.students
        }
    })
)