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
    on(PlanetActions.addPlanet, (state, { planet }) => ({
        ...state,
        planets: [...state.planets, planet],
    })),

    on(PlanetActions.updatePlanet, (state, { planet }) => ({
        ...state,
        planets: state.planets.map((p) => (p.id === planet.id ? planet : p)),
    })),

    on(PlanetActions.deletePlanet, (state, { id }) => ({
        ...state,
        planets: state.planets.filter((p) => p.id !== id),
    }))
);
