import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../../student';
import { Program, ProgramService, ProgramStatus } from '../../../program';
import { ResponseWrapper } from '../../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-note-program-board',
    templateUrl: './note-program-board.component.html',
    styleUrls: ['../note-program.css']
})
export class NoteProgramBoardComponent implements OnInit {

    @Input() parent: any;

    selectedCard = -1;
    isSaving: boolean;
    eventSubscriber: Subscription;

    constructor(
        private programService: ProgramService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
    ) {
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnInit() {
        this.registerChangeInPrograms();
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

    sendCardForward(i: number) {
        const errors = this.parent.validatorService.validate(this.parent.model, []);
        if (errors && errors.length > 0) {
            this.parent.onValidationError(errors);
        } else {
            if (this.parent.model.status === ProgramStatus.Plan) {
                this.parent.model.status = ProgramStatus.Progress;
            } else if (this.parent.model.status === ProgramStatus.Progress) {
                this.parent.model.status = ProgramStatus.Closable;
            } else if (this.parent.model.status === ProgramStatus.Closable) {
                this.parent.model.status = ProgramStatus.Closed;
                console.log('closable -> close');
            }
            console.log(this.parent.model);
            this.parent.save();
            this.parent.model.needToSave = false;
        }
    }

    sendCardBack(i: number) {
        if (this.parent.model.status === ProgramStatus.Plan) {
            // Delete card
            this.parent.programs.splice(i, 1);
            this.confirmDelete(i);
            this.parent.clean();
        } else if (this.parent.model.status === ProgramStatus.Progress) {
            this.parent.model.status = ProgramStatus.Plan;
            console.log('progress -> plan');
            console.log(this.parent.model.status);
        } else if (this.parent.model.status === ProgramStatus.Closable) {
            this.parent.model.status = ProgramStatus.Progress;
            console.log('closable -> progress');
        }
        this.parent.save();
        this.parent.model.needToSave = false;
    }

    onSaveButton() {
        this.parent.save();
        this.parent.model.needToSave = false;
    }

    onDeleteButton(i: number) {
        this.parent.programs.splice(i, 1);
        this.parent.clean();
    }

    onDatePickerChanged() {
        this.parent.model.needToSave = true;
    }

    confirmDelete(id: number) {
        this.programService.delete(id).subscribe();
    }

    registerChangeInPrograms() {
        this.eventSubscriber = this.eventManager.subscribe('programListModification', (response) => this.parent.loadPrograms());
    }
}
