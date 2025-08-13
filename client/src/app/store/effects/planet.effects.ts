import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlanetActions from '../actions/planet.actions';
import { PlanetService } from '../../shared/planet.service';
import { catchError, map, mergeMap, of, tap, concatMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PlanetEffects {
    private actions$ = inject(Actions);
    private planetService = inject(PlanetService);
    private router = inject(Router);

    loadPlanets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetActions.loadPlanets),
            mergeMap(() =>
                this.planetService.getPlanets().pipe(
                    map((planets) =>
                        PlanetActions.loadPlanetsSuccess({ planets })
                    ),
                    catchError((error) =>
                        of(
                            PlanetActions.loadPlanetsFailure({
                                error: error.message,
                            })
                        )
                    )
                )
            )
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetActions.deletePlanet),
            concatMap(({ id }) =>
                this.planetService.deletePlanet(id).pipe(
                    map(() => PlanetActions.deletePlanetSuccess({ id })),
                    catchError((error) =>
                        of(PlanetActions.deletePlanetFailure({ id, error }))
                    )
                )
            )
        )
    );

    deleteNavigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PlanetActions.deletePlanetSuccess),
                tap(() => this.router.navigate(['/planets']))
            ),
        { dispatch: false }
    );

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetActions.createPlanet),
            concatMap(({ planet }) =>
                this.planetService.createPlanet(planet).pipe(
                    map((created) =>
                        PlanetActions.createPlanetSuccess({ planet: created })
                    ),
                    catchError((error: unknown) =>
                        of(PlanetActions.createPlanetFailure({ error }))
                    )
                )
            )
        )
    );

    createNavigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PlanetActions.createPlanetSuccess),
                tap(() => this.router.navigate(['/planets']))
            ),
        { dispatch: false }
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetActions.updatePlanet),
            concatMap(({ planet }) =>
                this.planetService.updatePlanet(planet).pipe(
                    map((updated) =>
                        PlanetActions.updatePlanetSuccess({ planet: updated })
                    ),
                    catchError((error: unknown) =>
                        of(PlanetActions.updatePlanetFailure({ error }))
                    )
                )
            )
        )
    );
}
