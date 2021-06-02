import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { StudentResource } from 'src/interfaces/studentResource';

export const loadAllStudents = createAction(
    "[Students Resolver] Load Students"
);

export const allStudentsLoaded = createAction(
    "[Load Students Effect] All Students Loaded",
    props<{students:StudentResource[] }>()
);

export const deleteStudent = createAction(
    "[Delete Student Resolver] Delete Student"
)
export const studentDeleted = createAction(
    "[Delete Students Effect] Deleted",
    props<{update: Update<StudentResource>}>()
);
