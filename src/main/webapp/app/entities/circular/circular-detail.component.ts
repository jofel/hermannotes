import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager , JhiDataUtils } from 'ng-jhipster';

import { Circular } from './circular.model';
import { CircularService } from './circular.service';

@Component({
    selector: 'jhi-circular-detail',
    templateUrl: './circular-detail.component.html'
})
export class CircularDetailComponent implements OnInit, OnDestroy {

    circular: Circular;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private circularService: CircularService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCirculars();
    }

    load(id) {
        this.circularService.find(id).subscribe((circular) => {
            this.circular = circular;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCirculars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'circularListModification',
            (response) => this.load(this.circular.id)
        );
    }
}
