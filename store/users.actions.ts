import { Action } from '@ngrx/store';
import { ListMetadata } from '../../../models/list-metadata.model';

export const SEARCH = '[USERS] SEARCH';
export const SEARCH_DONE = '[USERS] SEARCH_DONE';
export const SEARCH_FAILED = '[USERS] SEARCH_FAILED';
export const SET_METADATA = '[USERS] SET_METADATA';

export class Search implements Action {
    readonly type: string = SEARCH;
    constructor(public payload: string) { }
}

export class SearchDone implements Action {
    readonly type: string = SEARCH_DONE;
    constructor(public payload: any[]) { }
}

export class SearchFailed implements Action {
    readonly type: string = SEARCH_FAILED;
    constructor(public payload: any) { }
}

export class SetMetadata implements Action {
    readonly type: string = SET_METADATA;
    constructor(public payload: ListMetadata) { }
}

export type Actions = Search | SearchDone | SearchFailed | SetMetadata;
