import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetState } from '../planet.state';

export const selectPlanetFeature =
    createFeatureSelector<PlanetState>('planets');

export const selectAllPlanets = createSelector(
    selectPlanetFeature,
    (state: PlanetState) => state.planets
);

export const selectPlanetLoading = createSelector(
    selectPlanetFeature,
    (state: PlanetState) => state.loading
);

export const selectPlanetError = createSelector(
    selectPlanetFeature,
    (state: PlanetState) => state.error
);

export const selectLoaded = createSelector(
    selectPlanetFeature,
    (s) => s.loaded
);
