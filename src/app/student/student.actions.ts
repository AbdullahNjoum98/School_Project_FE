import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { StudentResource } from 'src/interfaces/studentResource';
import { StudentVM } from 'src/interfaces/studentVM';

export const loadAllStudents = createAction(
    "[Students Resolver] Load Students"
);
export const allStudentsFailed = createAction(
    "[Load Students Effect] All Students Failed",
    props<{ payload: {error: string}}>()
);
export const allStudentsLoaded = createAction(
    "[Load Students Effect] All Students Loaded",
    props<{students:StudentResource[] }>()
);
export const updateStudent = createAction(
    "[Update Student Resolver] Update Student",
    props<{student: StudentVM}>()
);
export const studentUpdated = createAction(
    "[Update Student Effect] Updated",
    props<{student: Update<StudentResource>}>()
);
export const studentUpdatingFailed = createAction(
    "[Update Student Effect] Updating Failed",
    props<{ error: string }>()
);
export const deleteStudent = createAction(
    "[Delete Student Resolver] Delete Student",
    props<{studentId:number }>()
);
export const studentDeleted = createAction(
    "[Delete Students Effect] Deleted",
    props<{studentId:number }>()
);
export const studentDeletingFailed = createAction(
    "[Delete Students Effect] Deleting Failed",
    props<{ error: string }>()
);



