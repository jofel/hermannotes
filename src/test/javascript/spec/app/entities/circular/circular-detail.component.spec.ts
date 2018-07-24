/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HermannotesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CircularDetailComponent } from '../../../../../../main/webapp/app/entities/circular/circular-detail.component';
import { CircularService } from '../../../../../../main/webapp/app/entities/circular/circular.service';
import { Circular } from '../../../../../../main/webapp/app/entities/circular/circular.model';

describe('Component Tests', () => {

    describe('Circular Management Detail Component', () => {
        let comp: CircularDetailComponent;
        let fixture: ComponentFixture<CircularDetailComponent>;
        let service: CircularService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HermannotesTestModule],
                declarations: [CircularDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CircularService,
                    JhiEventManager
                ]
            }).overrideTemplate(CircularDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CircularDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CircularService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Circular(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.circular).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
