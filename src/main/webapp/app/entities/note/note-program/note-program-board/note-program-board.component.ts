import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../../student';
import { Program, ProgramService, ProgramStatus } from '../../../program';
import { ResponseWrapper } from '../../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs/Rx';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-note-program-board',
    templateUrl: './note-program-board.component.html',
    styleUrls: ['../note-program.css']
})
export class NoteProgramBoardComponent implements OnInit, OnDestroy {

    @Input() parent: any;

    selectedCard = -1;
    isSaving: boolean;

    constructor(
        private programService: ProgramService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
    ) {
    }

    ngOnInit() {
    }

    ngOnclick() {

    }

    ngOnDestroy() { }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    save() {
        this.isSaving = true;
        if (this.parent.model.id !== undefined) {
            this.subscribeToSaveResponse(
                this.programService.update(this.parent.model));
        } else {
            this.parent.model.status = ProgramStatus.Plan;
            this.subscribeToSaveResponse(
                this.programService.create(this.parent.model));
        }
    }

    private subscribeToSaveResponse(result: Observable<Program>) {
        result.subscribe((res: Program) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Program) {
        this.parent.loadPrograms();
        this.eventManager.broadcast({ name: 'programListModification', content: 'OK' });
        this.isSaving = false;
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

    setSelectedCard(index: number) {
        if (this.parent.selectedCard === index) {
            return;
        } else {
            this.parent.selectedCard = index;
            if (this.parent.model) {
                this.parent.model = this.parent.programs[index];
            }
            this.parent.initDatePickerModel();
        }
    }

    sendFromPlanToSuccess() {
        this.parent.model.status = ProgramStatus.Progress;
        this.save();
        this.parent.model.needToSave = false;
    }

    sendFromSuccessToClosed() {
        this.parent.model.status = ProgramStatus.Closed;
        this.save();
        this.parent.model.needToSave = false;
    }

    sendCardForward(i: number) {
        if (this.parent.model.status === ProgramStatus.Plan) {
            this.parent.model.status = ProgramStatus.Progress;
        } else if (this.parent.model.status === ProgramStatus.Progress) {
            this.parent.model.status = ProgramStatus.Closed;
        } else if (this.parent.model.status === ProgramStatus.Closed) {
            // Archive Card
        }
        this.save();
        this.parent.model.needToSave = false;
    }

    sendCardBack(i: number) {
        if (this.parent.model.status === ProgramStatus.Plan) {
            // Delete card
            this.parent.programs.splice(i, 1);
            this.parent.clean();
        } else if (this.parent.model.status === ProgramStatus.Progress) {
            this.parent.model.status = ProgramStatus.Plan;
        } else if (this.parent.model.status === ProgramStatus.Closed) {
            this.parent.model.status = ProgramStatus.Progress;
        }
        this.save();
        this.parent.model.needToSave = false;
    }

    onSaveButton() {
        this.save();
        this.parent.model.needToSave = false;
    }

    onDeleteButton(i: number) {
        this.parent.programs.splice(i, 1);
        this.parent.clean();
    }

    onDatePickerChanged() {
        this.parent.model.needToSave = true;
    }
}
