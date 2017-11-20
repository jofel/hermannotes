import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Circular } from './circular.model';
import { CircularService } from './circular.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-circular-generate',
    templateUrl: './circular-generate.component.html',
    styleUrls: ['./circular.css']
})

export class CircularGenerateComponent implements OnInit, OnDestroy {
    circulars: Circular[];
    circular: Circular;
    day: any;
    days= ['monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private circluarService: CircularService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.circluarService.query().subscribe(
            (res: ResponseWrapper) => {
                this.circulars = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCircular();
        console.log(this.circulars);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Circular) {
        return item.id;
    }
    registerChangeInCircular() {
        this.eventSubscriber = this.eventManager.subscribe('circluarListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
