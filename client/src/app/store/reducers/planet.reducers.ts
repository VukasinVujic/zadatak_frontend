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
        loaded: true,
        planets,
    })),
    on(PlanetActions.loadPlanetsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error,
    })),

    on(PlanetActions.createPlanet, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(PlanetActions.createPlanetSuccess, (state, { planet }) => ({
        ...state,
        loading: false,
        error: null,
        planets: [...state.planets, planet],
    })),

    on(PlanetActions.createPlanetFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PlanetActions.updatePlanet, (state, { planet }) => ({
        ...state,
        planets: state.planets.map((p) => (p.id === planet.id ? planet : p)),
    })),

    on(PlanetActions.deletePlanet, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(PlanetActions.deletePlanetSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        error: null,
        planets: state.planets.filter((p) => p.id !== id),
    })),

    on(PlanetActions.deletePlanetFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
