/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HermannotesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RequestDetailComponent } from '../../../../../../main/webapp/app/entities/request/request-detail.component';
import { RequestService } from '../../../../../../main/webapp/app/entities/request/request.service';
import { Request } from '../../../../../../main/webapp/app/entities/request/request.model';

describe('Component Tests', () => {

    describe('Request Management Detail Component', () => {
        let comp: RequestDetailComponent;
        let fixture: ComponentFixture<RequestDetailComponent>;
        let service: RequestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HermannotesTestModule],
                declarations: [RequestDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RequestService,
                    JhiEventManager
                ]
            }).overrideTemplate(RequestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RequestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Request(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.request).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
