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
    messageTitle = '';

    private resolver!: (v: boolean) => void;

    static open(msg: string): Promise<boolean> {
        // @ts-ignore
        return window['__confirm__']?.open(msg);
    }

    ngOnInit() {
        // @ts-ignore
        window['__confirm__'] = this;
    }

    open(msg: string, msgTitle: string) {
        this.message = msg;
        this.messageTitle = msgTitle;
        this.dlgRef.nativeElement.showModal();
        return new Promise((res) => (this.resolver = res));
    }

    removeItem() {
        this.dlgRef.nativeElement.close();
        this.resolver?.(true);
    }

    doNotRemoveItem() {
        this.dlgRef.nativeElement.close();
        this.resolver?.(false);
    }
}
