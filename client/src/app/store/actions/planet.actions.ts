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

export const createPlanet = createAction(
    '[Planet] Create',
    props<{ planet: Omit<Planet, 'id'> }>()
);

export const createPlanetSuccess = createAction(
    '[Planet] Create Success',
    props<{ planet: Planet }>()
);

export const createPlanetFailure = createAction(
    '[Planet] Create Failure',
    props<{ error: any }>()
);

export const updatePlanet = createAction(
    '[Planet] Update',
    props<{ planet: Planet }>()
);

export const updatePlanetSuccess = createAction(
    '[Planet] Update Success',
    props<{ planet: Planet }>()
);

export const updatePlanetFailure = createAction(
    '[Planet] Update Failure',
    props<{ error: any }>()
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
