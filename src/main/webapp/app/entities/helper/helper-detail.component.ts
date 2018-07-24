import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager  } from 'ng-jhipster';

import { Helper } from './helper.model';
import { HelperService } from './helper.service';

@Component({
    selector: 'jhi-helper-detail',
    templateUrl: './helper-detail.component.html'
})
export class HelperDetailComponent implements OnInit, OnDestroy {

    helper: Helper;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private helperService: HelperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHelpers();
    }

    load(id) {
        this.helperService.find(id).subscribe((helper) => {
            this.helper = helper;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHelpers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'helperListModification',
            (response) => this.load(this.helper.id)
        );
    }
}
