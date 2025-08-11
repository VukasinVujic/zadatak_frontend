import { Component, Input } from '@angular/core';
import { Planet } from '../../../models/planet';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-planet-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './planet-grid.component.html',
    styleUrls: ['./planet-grid.component.scss'],
})
export class PlanetGridComponent {
    @Input() planets: Planet[] = [];
    @Input() filterText = '';

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
}
