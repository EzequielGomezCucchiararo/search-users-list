import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { listAnimation } from '../../app.animations';
import * as fromApp from '../../store/app.reducer';
import * as fromUsers from './store/users.reducer';
import * as UsersActions from './store/users.actions';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: listAnimation
})
export class UsersComponent implements OnInit, OnDestroy {
    public searchField: FormControl;
    public usersState$: Observable<fromUsers.State>;
    private searchSubscription: Subscription = null;

    constructor(
        private router: Router,
        private store: Store<fromApp.State>
    ) { }

    ngOnInit(): void {
        this.usersState$ = this.store.select('users');
        this.searchField = new FormControl();
        this.searchSubscription = this.searchField.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
            ).subscribe(term => this.store.dispatch(new UsersActions.Search(term)));
    }

    ngOnDestroy(): void {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }

    goToUserProfile(): void {
        this.router.navigate(['users', '123']);
    }
}
