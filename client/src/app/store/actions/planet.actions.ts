import { createAction, props } from '@ngrx/store';
import { Planet } from '../../models/planet';

export const loadPlanets = createAction('[Planet] Load Planets');

export const loadPlanetsSuccess = createAction(
    '[Planet] Load Planets Success',
    props<{ planets: Planet[] }>()
);

export const loadPlanetsFailure = createAction(
    '[Planet] Load Planets Failure',
    props<{ error: string }>()
);

export const addPlanet = createAction(
    '[Planet] Add Planet',
    props<{ planet: Planet }>()
);

export const updatePlanet = createAction(
    '[Planet] Update Planet',
    props<{ planet: Planet }>()
);

export const deletePlanet = createAction(
    '[Planet] Delete Planet',
    props<{ id: number }>()
);

export const deletePlanetSuccess = createAction(
    '[Planet] Delete Success',
    props<{ id: number }>()
);

export const deletePlanetFailure = createAction(
    '[Planet] Delete Failure',
    props<{ id: number; error: any }>()
);
