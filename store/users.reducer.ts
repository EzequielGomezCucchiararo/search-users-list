import * as UsersActions from './users.actions';

import { ListMetadata } from '../../../models/list-metadata.model';

export interface State {
    searchTerms: string;
    results: any[];
    resultsMetadata: ListMetadata;
    loading: boolean;
    error: any;
}

const initialState: State = {
    searchTerms: '',
    results: [],
    resultsMetadata: null,
    loading: false,
    error: null
};

export function reducer(state: State = initialState, action: UsersActions.Actions) {
    switch (action.type) {
        case UsersActions.SEARCH:
            return {
                ...state,
                loading: true,
                error: null,
                results: [],
                searchTerms: action.payload
            };

        case UsersActions.SEARCH_DONE:
            return {
                ...state,
                loading: false,
                error: null,
                results: action.payload
            };

        case UsersActions.SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                results: [],
                error: action.payload,
            };

        case UsersActions.SET_METADATA:
            return {
                ...state,
                resultsMetadata: action.payload
            };

        default:
            return state;
    }
}
