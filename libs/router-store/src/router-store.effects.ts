import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import {
    NAVIGATE_TO,
    NAVIGATE_FORWARD,
    NAVIGATE_BACK,
    NavigateTo,
} from './router-store.actions';

@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false })
    navigateTo = this.actions$.ofType(NAVIGATE_TO)
        .pipe(
            map((action: NavigateTo) => action.payload),
            tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
        );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.ofType(NAVIGATE_FORWARD)
        .pipe(
            tap(() => this.location.forward())
        );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.ofType(NAVIGATE_BACK)
        .pipe(
            tap(() => this.location.back())
        );

    constructor(
        private actions$: Actions,
        private location: Location,
        private router: Router,
    ) {}
}
