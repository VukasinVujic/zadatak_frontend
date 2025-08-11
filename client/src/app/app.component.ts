import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlanetListViewComponent } from './planets/pages/planet-list-view/planet-list-view.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlanetActions from './store/actions/planet.actions';
import { selectLoaded } from './store/selectors/planet.selectors';
import { take } from 'rxjs';

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
        this.store
            .select(selectLoaded)
            .pipe(take(1))
            .subscribe((loaded) => {
                if (!loaded) this.store.dispatch(PlanetActions.loadPlanets());
            });
    }
}
