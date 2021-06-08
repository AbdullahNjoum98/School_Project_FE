import { Dictionary } from "@ngrx/entity";
import { createSelector, select } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { AppState } from "../reducers";

export const getAllStudents = createSelector(
    (state: AppState)=> state.studentState.entities,
    (students: Dictionary<StudentResource>) => <StudentResource[]>[...Object.values(students)] 
);
export const getStudent= (id: number)=> createSelector(
    (state: AppState)=> state.studentState.entities[id],
    (student) => <StudentResource>student 
);