/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HermannotesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HelperDetailComponent } from '../../../../../../main/webapp/app/entities/helper/helper-detail.component';
import { HelperService } from '../../../../../../main/webapp/app/entities/helper/helper.service';
import { Helper } from '../../../../../../main/webapp/app/entities/helper/helper.model';

describe('Component Tests', () => {

    describe('Helper Management Detail Component', () => {
        let comp: HelperDetailComponent;
        let fixture: ComponentFixture<HelperDetailComponent>;
        let service: HelperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HermannotesTestModule],
                declarations: [HelperDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HelperService,
                    JhiEventManager
                ]
            }).overrideTemplate(HelperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HelperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelperService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Helper(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.helper).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
