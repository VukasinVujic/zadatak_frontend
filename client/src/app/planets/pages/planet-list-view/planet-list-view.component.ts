import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
    selectAllPlanets,
    selectPlanetLoading,
} from '../../../store/selectors/planet.selectors';
import { selectViewMode } from '../../../store/selectors/ui.selectors';
import * as PlanetActions from '../../../store/actions/planet.actions';
import * as UIActions from '../../../store/actions/ui.actions';
import { PlanetTableComponent } from '../../components/planet-table/planet-table.component';
import { PlanetGridComponent } from '../../components/planet-grid/planet-grid.component';
import { PlanetFormDialogComponent } from '../../dialogs/planet-form-dialog/planet-form-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-planet-list-view',
    standalone: true,
    imports: [
        CommonModule,
        NgIf,
        AsyncPipe,
        PlanetTableComponent,
        PlanetGridComponent,
        FormsModule,
        PlanetFormDialogComponent,
        ConfirmDialogComponent,
    ],
    templateUrl: './planet-list-view.component.html',
    styleUrls: ['./planet-list-view.component.scss'],
})
export class PlanetListViewComponent {
    private store = inject(Store);
    planets$ = this.store.select(selectAllPlanets);
    loading$ = this.store.select(selectPlanetLoading);
    viewMode$ = this.store.select(selectViewMode);

    @ViewChild('confirmDlg') confirmDlg!: ConfirmDialogComponent;

    filterText = '';

    // make enum later
    switchView(current: 'grid' | 'table') {
        this.store.dispatch(
            UIActions.setViewMode({
                viewMode: current === 'grid' ? 'table' : 'grid',
            })
        );
    }

    async onCreate(formDlg: PlanetFormDialogComponent) {
        const draft = await formDlg.openForCreate();
        if (!draft) return;
        this.store.dispatch(PlanetActions.addPlanet({ planet: draft }));
    }

    async create(formDlg: PlanetFormDialogComponent) {
        const draft = await formDlg.openForCreate();
        if (!draft) return; // cancel
        const confirmed = await this.confirmDlg.open('Create new  Planet?');
        if (!confirmed) return;
        this.store.dispatch(PlanetActions.addPlanet({ planet: draft }));
    }

    onSortChanged(_: any) {
        console.log('implement sort change');
    }
}
