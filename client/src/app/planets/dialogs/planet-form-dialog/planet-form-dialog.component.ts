import { Component, ElementRef, ViewChild } from '@angular/core';

import { Planet } from '../../../models/planet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-planet-form-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, ConfirmDialogComponent],
    templateUrl: './planet-form-dialog.component.html',
    styleUrl: './planet-form-dialog.component.scss',
})
export class PlanetFormDialogComponent {
    @ViewChild('dlg') dlgRef!: ElementRef<HTMLDialogElement>;
    @ViewChild('confirmDlg') confirmDlg!: ConfirmDialogComponent;

    mode: 'create' | 'edit' = 'create';

    private resolver!: (value: Planet | null) => void;

    model: Planet = {
        id: 0,
        planetName: '',
        description: '',
        imageUrl: '',
        planetColor: '',
        distInMillionsKM: { fromSun: undefined, fromEarth: undefined },
    };

    openForCreate(): Promise<Planet | null> {
        this.mode = 'create';
        this.model = {
            id: Date.now(),
            planetName: '',
            description: '',
            imageUrl: '',
            imageName: '',
            planetColor: '',
            distInMillionsKM: { fromSun: undefined, fromEarth: undefined },
        };
        return this.openInternal();
    }

    openForEdit(p: Planet): Promise<Planet | null> {
        this.mode = 'edit';
        this.model = { ...p };
        return this.openInternal();
    }

    private openInternal(): Promise<Planet | null> {
        this.dlgRef.nativeElement.showModal();
        return new Promise((res) => (this.resolver = res));
    }

    cancel() {
        this.dlgRef.nativeElement.close();
        this.resolver?.(null);
    }

    async submit(ev: Event) {
        ev.preventDefault();

        if (!this.model.planetName?.trim()) return;
        this.dlgRef.nativeElement.close();
        const confirmed = await this.confirmDlg.open(
            this.mode === 'create' ? 'Create new planet?' : 'Update planet?'
        );
        if (!confirmed) return;

        this.resolver?.({ ...this.model });
    }
}
