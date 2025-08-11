import { createReducer, on } from '@ngrx/store';
import { initialUiState } from '../ui.state';
import * as UiActions from '../actions/ui.actions';

export const uiReducer = createReducer(
    initialUiState,
    on(UiActions.setViewMode, (state, { viewMode }) => ({
        ...state,
        viewMode,
    }))
);
