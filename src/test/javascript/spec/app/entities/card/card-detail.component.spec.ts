/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HermannotesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CardDetailComponent } from '../../../../../../main/webapp/app/entities/card/card-detail.component';
import { CardService } from '../../../../../../main/webapp/app/entities/card/card.service';
import { Card } from '../../../../../../main/webapp/app/entities/card/card.model';

describe('Component Tests', () => {

    describe('Card Management Detail Component', () => {
        let comp: CardDetailComponent;
        let fixture: ComponentFixture<CardDetailComponent>;
        let service: CardService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HermannotesTestModule],
                declarations: [CardDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CardService,
                    JhiEventManager
                ]
            }).overrideTemplate(CardDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Card(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.card).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
