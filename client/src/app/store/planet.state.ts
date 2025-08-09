import { Planet } from '../models/planet';

export interface PlanetState {
    planets: Planet[];
    selectedPlanet: Planet | null;
    loading: boolean;
    error: string | null;
}

export const initialPlanetState: PlanetState = {
    planets: [],
    selectedPlanet: null,
    loading: false,
    error: null,
};
