import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Card } from './card.model';
import { CardService } from './card.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-card-generate',
    templateUrl: './card-generate.component.html',
    styleUrls: ['./card.css']
})

export class CardGenerateComponent implements OnInit, OnDestroy {
    cardList: Card[];
    cardItem: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardService: CardService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cardList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCard();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Card) {
        return item.id;
    }
    registerChangeInCard() {
        this.eventSubscriber = this.eventManager.subscribe('cardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
