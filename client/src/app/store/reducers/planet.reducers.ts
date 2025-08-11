import { createReducer, on } from '@ngrx/store';
import { initialPlanetState } from '../planet.state';
import * as PlanetActions from '../actions/planet.actions';

export const planetFeatureKey = 'planets';

export const planetReducer = createReducer(
    initialPlanetState,
    on(PlanetActions.loadPlanets, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(PlanetActions.loadPlanetsSuccess, (state, { planets }) => ({
        ...state,
        loading: false,
        planets,
    })),
    on(PlanetActions.loadPlanetsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(PlanetActions.addPlanet, (state, { planet }) => ({
        ...state,
        planets: [...state.planets, planet],
    }))
);
