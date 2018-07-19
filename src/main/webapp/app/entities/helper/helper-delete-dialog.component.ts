import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Helper } from './helper.model';
import { HelperPopupService } from './helper-popup.service';
import { HelperService } from './helper.service';

@Component({
    selector: 'jhi-helper-delete-dialog',
    templateUrl: './helper-delete-dialog.component.html'
})
export class HelperDeleteDialogComponent {

    helper: Helper;

    constructor(
        private helperService: HelperService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.helperService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'helperListModification',
                content: 'Deleted an helper'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-helper-delete-popup',
    template: ''
})
export class HelperDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private helperPopupService: HelperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.helperPopupService
                .open(HelperDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
