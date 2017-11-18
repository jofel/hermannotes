import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Circular } from './circular.model';
import { CircularPopupService } from './circular-popup.service';
import { CircularService } from './circular.service';

@Component({
    selector: 'jhi-circular-delete-dialog',
    templateUrl: './circular-delete-dialog.component.html'
})
export class CircularDeleteDialogComponent {

    circular: Circular;

    constructor(
        private circularService: CircularService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.circularService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'circularListModification',
                content: 'Deleted an circular'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-circular-delete-popup',
    template: ''
})
export class CircularDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private circularPopupService: CircularPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.circularPopupService
                .open(CircularDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
