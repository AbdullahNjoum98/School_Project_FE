import { EntityState } from "@ngrx/entity";
import { ActionReducerMap } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { studentReducer } from "../student/student.reducer";

export interface AppState  {
    studentState: EntityState<StudentResource>;
}
export const reducers: ActionReducerMap<AppState> = {
    studentState: studentReducer
};