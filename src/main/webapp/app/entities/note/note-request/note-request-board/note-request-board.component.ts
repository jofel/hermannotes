import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../../student';
import { Request, RequestService, RequestStatus } from '../../../request';
import { ResponseWrapper } from '../../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-note-request-board',
    templateUrl: './note-request-board.component.html',
    styleUrls: ['../note-request.css']
})
export class NoteRequestBoardComponent implements OnInit {

    @Input() parent: any;

    selectedCard = -1;
    isSaving: boolean;
    eventSubscriber: Subscription;

    constructor(
        private requestService: RequestService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
    ) {
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnInit() {
        this.registerChangeInRequests();
    }

    setSelectedCard(index: number) {
        if (this.parent.selectedCard === index) {
            return;
        } else {
            this.parent.selectedCard = index;
            if (this.parent.model) {
                this.parent.model = this.parent.requests[index];
            }
            this.parent.initDatePickerModel();
        }
    }

    sendCardForward(i: number) {
        const errors = this.parent.validatorService.validate(this.parent.model, []);
        if (errors && errors.length > 0) {
            this.parent.onValidationError(errors);
        } else {
            if (this.parent.model.status === RequestStatus.Plan) {
                this.parent.model.status = RequestStatus.Progress;
            } else if (this.parent.model.status === RequestStatus.Progress) {
                this.parent.model.status = RequestStatus.Closable;
            } else if (this.parent.model.status === RequestStatus.Closable) {
                this.parent.model.status = RequestStatus.Closed;
                console.log('closable -> close');
            }
            console.log(this.parent.model);
            this.parent.save();
            this.parent.model.needToSave = false;
        }
    }

    sendCardBack(i: number) {
        if (this.parent.model.status === RequestStatus.Plan) {
            // Delete card
            this.parent.requests.splice(i, 1);
            this.confirmDelete(i);
            this.parent.clean();
        } else if (this.parent.model.status === RequestStatus.Progress) {
            this.parent.model.status = RequestStatus.Plan;
            console.log('progress -> plan');
            console.log(this.parent.model.status);
        } else if (this.parent.model.status === RequestStatus.Closable) {
            this.parent.model.status = RequestStatus.Progress;
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
        this.parent.requests.splice(i, 1);
        this.parent.clean();
    }

    onDatePickerChanged() {
        this.parent.model.needToSave = true;
    }

    confirmDelete(id: number) {
        this.requestService.delete(id).subscribe();
    }

    registerChangeInRequests() {
        this.eventSubscriber = this.eventManager.subscribe('requestListModification', (response) => this.parent.loadRequests());
    }
}
