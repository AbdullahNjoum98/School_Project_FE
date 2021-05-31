import { createAction, props } from '@ngrx/store';
import { StudentResource } from 'src/interfaces/studentResource';

export const loadAllStudents = createAction(
    "[Students Resolver] Load Students"
);

export const allStudentsLoaded = createAction(
    "[Load Students Effect] All Students Loaded",
    props<{students:StudentResource[] }>()
);