import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent implements OnInit {
    @ViewChild('dlg') dlgRef!: ElementRef<HTMLDialogElement>;
    message = '';

    private resolver!: (v: boolean) => void;

    static open(msg: string): Promise<boolean> {
        // @ts-ignore
        return window['__confirm__']?.open(msg);
    }

    ngOnInit() {
        // @ts-ignore
        window['__confirm__'] = this;
    }

    open(msg: string) {
        this.message = msg;
        this.dlgRef.nativeElement.showModal();
        return new Promise((res) => (this.resolver = res));
    }

    yes() {
        this.dlgRef.nativeElement.close();
        this.resolver?.(true);
    }
    no() {
        this.dlgRef.nativeElement.close();
        this.resolver?.(false);
    }
}
