import { CommonModule, Location } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';

import { selectAllPlanets } from '../../../store/selectors/planet.selectors';
import { Planet } from '../../../models/planet';
import * as PlanetActions from '../../../store/actions/planet.actions';
import { PlanetFormDialogComponent } from '../../dialogs/planet-form-dialog/planet-form-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-planet-detail-page',
    standalone: true,
    imports: [PlanetFormDialogComponent, ConfirmDialogComponent, CommonModule],
    templateUrl: './planet-detail-page.component.html',
    styleUrl: './planet-detail-page.component.scss',
})
export class PlanetDetailPageComponent {
    constructor(private location: Location) {}

    @ViewChild('confirmDlg') confirmDlg!: ConfirmDialogComponent;

    private route = inject(ActivatedRoute);
    private store = inject(Store);
    private router = inject(Router);

    planet$ = this.route.paramMap.pipe(
        switchMap((params) => {
            const idParam = params.get('id');
            if (!idParam) return of(undefined);
            const id = Number(idParam);
            return this.store
                .select(selectAllPlanets)
                .pipe(map((list) => list.find((p) => p.id === id)));
        })
    );

    async edit(p: Planet, formCmp: PlanetFormDialogComponent) {
        const update = await formCmp.openForEdit(p);
        if (!update) return;
        this.store.dispatch(PlanetActions.updatePlanet({ planet: update }));
    }

    async remove(p: Planet) {
        const confirmed = await this.confirmDlg.open(
            `delete ${p.planetName}?`,
            'deleting'
        );
        if (!confirmed) return;
        this.store.dispatch(PlanetActions.deletePlanet({ id: p.id }));
        this.router.navigate(['/planets']);
    }

    goBack() {
        this.location.back();
    }
}
