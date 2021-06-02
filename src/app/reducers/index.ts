import { ActionReducerMap } from "@ngrx/store";
import { studentListReducer, StudentState } from "../student-list/student.reducer";

export interface AppState {
    studentState: StudentState;
}
export const reducers: ActionReducerMap<AppState> = {
    studentState: studentListReducer
  };
