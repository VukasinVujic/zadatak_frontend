import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Planet } from '../../../models/planet';

@Component({
    selector: 'app-planet-grid',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './planet-grid.component.html',
    styleUrls: ['./planet-grid.component.scss'],
})
export class PlanetGridComponent {
    @Input() planets: Planet[] = [];
    @Input() filterText = '';

    private router = inject(Router);
    trackById = (_: number, p: Planet) => p.id ?? p.planetName;

    // duplicate code fix later
    get view(): Planet[] {
        let rows = [...this.planets];

        if (this.filterText?.trim()) {
            const q = this.filterText.toLowerCase();
            rows = rows.filter((p) =>
                (p.planetName ?? '').toLowerCase().includes(q)
            );
        }
        return rows;
    }

    goToDetails(p: Planet) {
        this.router.navigate(['/planet', p.id]);
    }
}
