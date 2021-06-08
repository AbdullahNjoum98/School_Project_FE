import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../../reducers";
import { loadStudent } from "../student.actions";
import { getStudent } from "../student.selectors";

@Injectable({
    providedIn: 'root'
})
export class StudentFormReslover implements Resolve<any> { 
    loading = false;
    constructor(private store: Store<AppState>){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>
    {
        const id = route.params['id']
        let dataExists:boolean=false; 
        this.store.select(getStudent(id)).subscribe(e=> e?.id? dataExists=true: dataExists=false);
        return this.store.
            pipe(
                tap(()=>{
                    if(!this.loading && !dataExists){
                        this.loading = true;
                        this.store.dispatch(loadStudent({id: id}));
                    }
                }),
                first(),
                finalize(()=> { this.loading = false})
            );
    }
}