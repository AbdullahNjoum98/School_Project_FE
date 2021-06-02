import { createSelector, select } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { AppState } from "../reducers";
import { StudentState } from "./student.reducer";

export const getAllStudents = createSelector(
    (state: AppState)=> state.studentState.students,
    (students: StudentResource[]) => students.map(e=>e)//operations if needed)
);