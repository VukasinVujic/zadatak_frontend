import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Planet } from '../../../models/planet';

@Component({
    selector: 'app-create-planet-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-planet-dialog.component.html',
    styleUrls: ['./create-planet-dialog.component.scss'],
})
export class CreatePlanetDialogComponent {
    @ViewChild('dlg') dlgRef!: ElementRef<HTMLDialogElement>;
    @Output() create = new EventEmitter<Planet>();

    model: Partial<Planet> = {
        planetName: '',
        planetRadiusKM: undefined as any,
    };

    open() {
        this.dlgRef.nativeElement.showModal();
    }
    close() {
        this.dlgRef.nativeElement.close();
    }

    submit() {
        if (!this.model.planetName || this.model.planetRadiusKM == null) return;
        this.create.emit(this.model as Planet);
        this.close();
        this.model = { planetName: '', planetRadiusKM: undefined as any };
    }
}
