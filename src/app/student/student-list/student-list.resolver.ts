import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, map, tap } from "rxjs/operators";
import { AppState } from "../../reducers";
import { loadAllStudents } from "../student.actions";
import { getAllStudents } from "../student.selectors";

@Injectable({
    providedIn: 'root'
})
export class StudentListReslover implements Resolve<any> { 
    loading = false;
    constructor(private store: Store<AppState>){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>
    {
        let dataExists:boolean; 
        this.store.select(getAllStudents).subscribe(e=> e.length===0? dataExists=true: dataExists=false);
        return this.store.
            pipe(
                tap(()=>{
                    if(!this.loading && dataExists){
                        this.loading = true;
                        this.store.dispatch(loadAllStudents());
                    }
                }),
                first(),
                finalize(()=> { this.loading = false})
            );
    }
}