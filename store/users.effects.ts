import { Actions, Effect } from '@ngrx/effects';
import { UsersService } from '../users.service';
import { Injectable } from '@angular/core';
import * as UsersActions from './users.actions';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UsersEffects {
    @Effect()
    search = this.actions$
        .ofType(UsersActions.SEARCH)
        .pipe(
            map((action: UsersActions.Search) => {
                return action.payload;
            }),
            switchMap((term: string): Observable<any[]> => {
                return this.usersService.getUsers({ 'query': term });
            }),
            switchMap((users: any[]): Observable<UsersActions.SearchDone> => {
                return of({ type: UsersActions.SEARCH_DONE, payload: users });
            }),
            catchError((err: Error, caught: Actions): Observable<UsersActions.SearchFailed> => {
                return of({ type: UsersActions.SEARCH_FAILED, payload: err });
            })
        );

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }
}
