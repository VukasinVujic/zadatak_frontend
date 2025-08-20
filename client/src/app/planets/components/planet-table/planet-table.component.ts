import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Planet } from '../../../models/planet';

type Sort = { field: SortField; dir: 'asc' | 'desc' };
type SortField =
    | keyof Planet
    | 'distInMillionsKM.fromSun'
    | 'distInMillionsKM.fromEarth';

@Component({
    selector: 'app-planet-table',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './planet-table.component.html',
    styleUrl: './planet-table.component.scss',
})
export class PlanetTableComponent {
    @Input() planets: Planet[] = [];
    @Input() filterText = '';
    @Output() sortChange = new EventEmitter<Sort>();

    trackPlanet = (_: number, p: Planet) => p.id ?? p.planetName;
    sort: Sort | null = null;

    private getField(p: Planet, f: SortField) {
        switch (f) {
            case 'distInMillionsKM.fromSun':
                return p.distInMillionsKM?.fromSun ?? null;
            case 'distInMillionsKM.fromEarth':
                return p.distInMillionsKM?.fromEarth ?? null;
            default:
                return (p as any)[f] ?? null;
        }
    }

    private cmp(x: any, y: any) {
        if (x == null && y != null) return -1;
        if (x != null && y == null) return 1;
        if (x == null && y == null) return 0;
        if (typeof x === 'string' && typeof y === 'string') {
            return x.localeCompare(y, undefined, { sensitivity: 'base' });
        }
        return x < y ? -1 : x > y ? 1 : 0;
    }

    // duplicate code fix later
    get view(): Planet[] {
        let rows = [...this.planets];

        console.log('rows: ', rows);

        if (this.filterText?.trim()) {
            const q = this.filterText.toLowerCase();
            rows = rows.filter((p) =>
                (p.planetName ?? '').toLowerCase().includes(q)
            );
        }

        if (this.sort) {
            const { field, dir } = this.sort;
            rows.sort((a: any, b: any) => {
                const av = this.getField(a, field);
                const bv = this.getField(b, field);
                const r = this.cmp(av, bv);
                return dir === 'asc' ? r : -r;
            });
        }

        return rows;
    }

    onSort(field: SortField) {
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
