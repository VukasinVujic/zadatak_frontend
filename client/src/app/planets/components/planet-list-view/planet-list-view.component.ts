import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import {
    selectAllPlanets,
    selectPlanetLoading,
} from '../../../store/selectors/planet.selectors';
import * as PlanetActions from '../../../store/actions/planet.actions';

@Component({
    selector: 'app-planet-list-view',
    standalone: true,
    imports: [CommonModule, NgIf, NgFor, AsyncPipe],
    templateUrl: './planet-list-view.component.html',
    styleUrls: ['./planet-list-view.component.scss'],
})
export class PlanetListViewComponent implements OnInit {
    private store = inject(Store);
    planets$ = this.store.select(selectAllPlanets);
    loading$ = this.store.select(selectPlanetLoading);

    ngOnInit() {
        this.store.dispatch(PlanetActions.loadPlanets());
    }
}
