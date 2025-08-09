export interface Planet {
    id: number;
    planetName: string;
    planetColor: string;
    planetRadiusKM: number;
    distInMillionsKM: distSunOrEarth;
    description: string;
    imageUrl: string;
    imageName: string;
}

interface distSunOrEarth {
    fromSun: number;
    fromEarth: number;
}
