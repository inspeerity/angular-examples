import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const NAVIGATE_TO = '[Router] Navigate To';
export const NAVIGATE_FORWARD = '[Router] Navigate Forward';
export const NAVIGATE_BACK = '[Router] Navigate Back';

export class NavigateTo implements Action {
    readonly type = NAVIGATE_TO;

    constructor(public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) {}
}

export class NavigateForward implements Action {
    readonly type = NAVIGATE_FORWARD;
}

export class NavigateBack implements Action {
    readonly type = NAVIGATE_BACK;
}

export type Actions
    = NavigateTo |
    NavigateForward |
    NavigateBack;
