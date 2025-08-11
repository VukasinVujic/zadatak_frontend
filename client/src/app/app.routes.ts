import { Routes } from '@angular/router';
import { PlanetListViewComponent } from './planets/pages/planet-list-view/planet-list-view.component';
import { PlanetDetailPageComponent } from './planets/pages/planet-detail-page/planet-detail-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'planets', pathMatch: 'full' },
    { path: 'planets', component: PlanetListViewComponent },
    { path: 'planets/:id', component: PlanetDetailPageComponent },
    { path: '**', redirectTo: 'planets' },
];
