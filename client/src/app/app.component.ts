import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlanetListViewComponent } from './planets/components/planet-list-view/planet-list-view.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlanetActions from './store/actions/planet.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, PlanetListViewComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(PlanetActions.loadPlanets());
    }
}
