import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planet } from '../../../models/planet';
import { CommonModule, NgFor } from '@angular/common';

type Sort = { field: keyof Planet; dir: 'asc' | 'desc' };

@Component({
    selector: 'app-planet-table',
    standalone: true,
    imports: [CommonModule, NgFor],
    templateUrl: './planet-table.component.html',
    styleUrl: './planet-table.component.scss',
})
export class PlanetTableComponent {
    @Input() planets: Planet[] = [];
    @Input() filterText = '';
    @Output() sortChange = new EventEmitter<Sort>();

    sort: Sort | null = null;

    // duplicate code fix later
    get view(): Planet[] {
        let rows = [...this.planets];

        if (this.filterText?.trim()) {
            const q = this.filterText.toLowerCase();
            rows = rows.filter((p) =>
                (p.planetName ?? '').toLowerCase().includes(q)
            );
        }

        if (this.sort) {
            const { field, dir } = this.sort;
            rows.sort((a: any, b: any) => {
                const av = a[field];
                const bv = b[field];
                if (av == null && bv != null) return -1;
                if (av != null && bv == null) return 1;
                if (av == null && bv == null) return 0;
                if (av < bv) return dir === 'asc' ? -1 : 1;
                if (av > bv) return dir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return rows;
    }

    onSort(field: keyof Planet) {
        if (!this.sort || this.sort.field !== field) {
            this.sort = { field, dir: 'asc' };
        } else {
            this.sort = {
                field,
                dir: this.sort.dir === 'asc' ? 'desc' : 'asc',
            };
        }
        this.sortChange.emit(this.sort);
    }
}
