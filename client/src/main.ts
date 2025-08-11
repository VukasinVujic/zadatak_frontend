import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { planetReducer } from './app/store/reducers/planet.reducers';
import { PlanetEffects } from './app/store/effects/planet.effects';
import { uiReducer } from './app/store/reducers/ui.reducers';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        provideStore({ planets: planetReducer, ui: uiReducer }),
        provideEffects([PlanetEffects]),
    ],
}).catch((err) => console.error(err));
