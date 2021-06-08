import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { StudentResource } from "src/interfaces/studentResource";
import { StudentListActions } from "./action-types";

export interface StudentState extends EntityState<StudentResource> {
    students: StudentResource[];
};

export const adapter = createEntityAdapter<StudentResource>();
export const initialStudentState = adapter.getInitialState();
export const studentReducer = createReducer(
    initialStudentState,
    on(StudentListActions.allStudentsLoaded,
        (state, action) =>
            adapter.addMany(action.students, state)
    ),
    on(StudentListActions.studentDeleted,
        (state, action) =>
            adapter.removeOne(action.studentId, state)
    ),
    on(StudentListActions.studentUpdated,
        (state, action) =>
            adapter.updateOne(action.student, state)
    ),
    on(StudentListActions.studentAdded,
        (state, action) =>
            adapter.addOne(action.student, state)
    ),
    on(StudentListActions.studentLoaded,
        (state, action) =>
            adapter.addOne(action.student, state)
    ),
)