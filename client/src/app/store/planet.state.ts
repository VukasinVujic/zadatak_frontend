import { Planet } from '../models/planet';

export interface PlanetState {
    planets: Planet[];
    selectedPlanet: Planet | null;
    loading: boolean;
    loaded: boolean;
    error: string | null;
    pendingDeleteIds: number[];
}

export const initialPlanetState: PlanetState = {
    planets: [],
    selectedPlanet: null,
    loading: false,
    loaded: false,
    error: null,
    pendingDeleteIds: [],
};
