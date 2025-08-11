import { createAction, props } from '@ngrx/store';

export const setViewMode = createAction(
    '[UI] Set View Mode',
    props<{ viewMode: 'grid' | 'table' }>()
);
