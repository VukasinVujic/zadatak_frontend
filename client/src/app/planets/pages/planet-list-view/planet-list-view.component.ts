import { Component, inject, OnInit } from '@angular/core';
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
import { Planet } from '../../../models/planet';
import { CreatePlanetDialogComponent } from '../../dialogs/create-planet-dialog/create-planet-dialog.component';
import { PlanetTableComponent } from '../../components/planet-table/planet-table.component';
import { PlanetGridComponent } from '../../components/planet-grid/planet-grid.component';

@Component({
    selector: 'app-planet-list-view',
    standalone: true,
    imports: [
        CommonModule,
        NgIf,
        NgFor,
        AsyncPipe,
        CreatePlanetDialogComponent,
        PlanetTableComponent,
        PlanetGridComponent,
        FormsModule,
    ],
    templateUrl: './planet-list-view.component.html',
    styleUrls: ['./planet-list-view.component.scss'],
})
export class PlanetListViewComponent implements OnInit {
    private store = inject(Store);
    planets$ = this.store.select(selectAllPlanets);
    loading$ = this.store.select(selectPlanetLoading);
    viewMode$ = this.store.select(selectViewMode);

    filterText = '';

    ngOnInit() {
        this.store.dispatch(PlanetActions.loadPlanets());
    }

    // make enum later
    switchView(current: 'grid' | 'table') {
        this.store.dispatch(
            UIActions.setViewMode({
                viewMode: current === 'grid' ? 'table' : 'grid',
            })
        );
    }

    onCreate(planet: Planet) {
        this.store.dispatch(PlanetActions.addPlanet({ planet }));
    }

    onSortChanged(_: any) {
        console.log('implement sort change');
    }
}
