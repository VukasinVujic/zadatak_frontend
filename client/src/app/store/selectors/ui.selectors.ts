import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../ui.state';

export const selectUiFeature = createFeatureSelector<UiState>('ui');

export const selectViewMode = createSelector(
    selectUiFeature,
    (state: UiState) => state.viewMode
);
