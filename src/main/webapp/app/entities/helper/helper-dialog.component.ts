import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Helper } from './helper.model';
import { HelperPopupService } from './helper-popup.service';
import { HelperService } from './helper.service';
import { Program, ProgramService } from '../program';
import { Student, StudentService } from '../student';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-helper-dialog',
    templateUrl: './helper-dialog.component.html'
})
export class HelperDialogComponent implements OnInit {

    helper: Helper;
    isSaving: boolean;

    programs: Program[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private helperService: HelperService,
        private programService: ProgramService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.students = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.helper.id !== undefined) {
            this.subscribeToSaveResponse(
                this.helperService.update(this.helper));
        } else {
            this.subscribeToSaveResponse(
                this.helperService.create(this.helper));
        }
    }

    private subscribeToSaveResponse(result: Observable<Helper>) {
        result.subscribe((res: Helper) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Helper) {
        this.eventManager.broadcast({ name: 'helperListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackProgramById(index: number, item: Program) {
        return item.id;
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-helper-popup',
    template: ''
})
export class HelperPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private helperPopupService: HelperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.helperPopupService
                    .open(HelperDialogComponent as Component, params['id']);
            } else {
                this.helperPopupService
                    .open(HelperDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
