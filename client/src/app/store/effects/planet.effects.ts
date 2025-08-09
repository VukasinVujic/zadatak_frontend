import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlanetActions from '../actions/planet.actions';
import { PlanetService } from '../../shared/planet.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PlanetEffects {
    private actions$ = inject(Actions);
    private planetService = inject(PlanetService);

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
}
