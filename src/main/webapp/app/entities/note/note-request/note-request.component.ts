import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService, StudentStatus } from '../../student';
import { Request, RequestService, RequestStatus } from '../../request';
import { Helper, HelperService } from '../../helper';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NoteRequestValidatorService } from './validation/note-request-validator.service';
import { ValidationError } from '../../../shared/validation/validation-error';

@Component({
    selector: 'jhi-note-request',
    templateUrl: './note-request.component.html',
    styleUrls: ['./note-request.css'],
    providers: [NoteRequestValidatorService],
})
export class NoteRequestComponent implements OnInit, OnDestroy {

    students: Student[];
    requests: Request[];
    helpers: Helper[];
    selectedCard = -1;
    model: Request;
    isSaving: boolean;
    d: NgbDatepicker;
    dateOfDeclarationPicker: NgbDateStruct;
    public instance;
    eventSubscriber: Subscription;

    constructor(
        private studentService: StudentService,
        private requestService: RequestService,
        private helperService: HelperService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private validatorService: NoteRequestValidatorService,
    ) {
        this.model = new Request();
        this.instance = this;
    }

    ngOnInit() {
        this.registerChangeInRequests();
        this.loadStudents();
        this.loadRequests();
    }

    onClick(event) {
        if (event.target.id === 'onAddButton') {
            const errors = this.validatorService.validate(this.model, []);
            if (errors && errors.length > 0) {
                this.onValidationError(errors);
            } else {
                // this.model.status = ProgramStatus.Plan;
                this.subscribeToSaveResponse(
                    this.requestService.create(this.model)
                );
                // this.loadPrograms();
                // this.model.needToSave = false;
                this.clean();
            }
        } else if (event.target.id === 'onAddHelperButton') {
            // this.model.helpers.push(new Student());
            console.log('helper added');
        } else if (event.target.id === 'onDeleteHelperButton') {
            // this.model.helpers.splice(1, 1);
        }

    }

    ngOnDestroy(): void {
        this.alertService.clear();
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    loadRequests() {
        this.requestService.query().subscribe(
            (res: ResponseWrapper) => {
                // this.programs = res.json.sort((a, b) => a.id - b.id);
                this.requests = res.json.sort(function (a, b) { return a.id - b.id });
                if (this.selectedCard !== -1) {
                    this.model = this.requests[this.selectedCard];
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    loadStudents() {
        this.studentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.students = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    // loadHelpers() {
    //     this.helperService.query().subscribe(
    //         (res: ResponseWrapper) => {
    //             this.helpers = res.json;
    //         }, (res: ResponseWrapper) => this.onError(res.json));
    // }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            console.log('UPDATE');
            this.subscribeToSaveResponse(
                this.requestService.update(this.model));
        } else {
            console.log('CREATE');
            this.model.status = RequestStatus.Plan;
            this.subscribeToSaveResponse(
                this.requestService.create(this.model));
        }
    }

    private subscribeToSaveResponse(result: Observable<Request>) {
        result.subscribe((res: Request) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Request) {
        // this.registerChangeInPrograms();
        this.eventManager.broadcast({ name: 'requestListModification', content: 'OK' });
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

    planIsDisabled() {
        return this.model.status !== RequestStatus.Plan && this.selectedCard !== -1;
    }

    decisionIsDisabled() {
        return this.model.status !== RequestStatus.Progress;
    }

    reportIsDisabled() {
        return this.model.status !== RequestStatus.Closable;
    }

    basicIsDisabled() {
        return this.model.status === RequestStatus.Closed;
    }

    onSaveButton() {
        this.save();
        this.model.needToSave = false;
        this.clean();
    }

    modelChanged() {
        this.model.needToSave = true;
    }

    onDatePickerChanged() {
        this.model.needToSave = true;
    }

    clean() {
        this.model = new Request();
        this.selectedCard = -1;
    }

    private initDatePickerModel() {
        const date = this.model.date;

        this.dateOfDeclarationPicker = {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Added because in the JS Date class, months start with zero
            day: date.getDate()
        }
        this.model.date = this.dateOfDeclarationPicker;
    }

    private onValidationError(errors: ValidationError[]) {
        this.alertService.clear();
        for (const error of errors) {
            const msg = error.message;
            this.alertService.addAlert({
                type: 'danger',
                msg,
                timeout: 50000,
                toast: this.alertService.isToast()
            }, []);
        }
    }

    registerChangeInRequests() {
        this.eventSubscriber = this.eventManager.subscribe('requestListModification', (response) => this.loadRequests());
    }

}
