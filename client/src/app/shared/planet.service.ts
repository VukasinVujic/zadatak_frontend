import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from '../models/planet';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlanetService {
    constructor(private http: HttpClient) {}

    getPlanets(): Observable<Planet[]> {
        return this.http.get<Planet[]>('/api/planets');
    }

    deletePlanet(id: number): Observable<void> {
        return this.http.delete<void>(`/api/planets/${id}`);
    }
}
