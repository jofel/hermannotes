import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService, StudentStatus } from '../../student';
import { Program, ProgramService, ProgramStatus } from '../../program';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs/Rx';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NoteProgramValidatorService } from './validation/note-program-validator.service';
import { ValidationError } from '../../../shared/validation/validation-error';

@Component({
    selector: 'jhi-note-program',
    templateUrl: './note-program.component.html',
    styleUrls: ['./note-program.css'],
    providers: [NoteProgramValidatorService],
})
export class NoteProgramComponent implements OnInit, OnDestroy {

    students: Student[];
    studentsKb: Student[];
    programs: Program[];
    selectedCard = -1;
    model: Program;
    isSaving: boolean;
    d: NgbDatepicker;
    dateOfDeclarationPicker: NgbDateStruct;
    public instance;

    constructor(
        private studentService: StudentService,
        private programService: ProgramService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private validatorService: NoteProgramValidatorService,
    ) {
        this.model = new Program();
        this.instance = this;
    }

    ngOnInit() {
        this.loadStudents();
        this.loadPrograms();
    }

    onClick(event) {
        if (event.target.id === 'onAddButton') {
            const errors = this.validatorService.validate(this.model, []);
            if (errors && errors.length > 0) {
                this.onValidationError(errors);
            } else {
                this.model.status = ProgramStatus.Plan;
                this.subscribeToSaveResponse(
                    this.programService.create(this.model)
                );
                this.loadPrograms();
                this.model.needToSave = false;
                this.clean();
            }
        }
    }

    ngOnDestroy(): void {
        this.alertService.clear();
    }

    private loadStudents() {
        this.studentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.students = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    loadPrograms() {
        this.programService.query().subscribe(
            (res: ResponseWrapper) => {
                // this.programs = res.json.sort((a, b) => a.id - b.id);
                this.programs = res.json.sort(function (a, b) { return a.id - b.id });
                console.log(this.programs);
            }, (res: ResponseWrapper) => this.onError(res.json));
        console.log('loadPrograms');
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            console.log('UPDATE');
            this.subscribeToSaveResponse(
                this.programService.update(this.model));
        } else {
            console.log('CREATE');
            this.model.status = ProgramStatus.Plan;
            this.subscribeToSaveResponse(
                this.programService.create(this.model));
        }
    }

    private subscribeToSaveResponse(result: Observable<Program>) {
        result.subscribe((res: Program) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Program) {
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

    planIsDisabled() {
        return this.model.status !== ProgramStatus.Plan && this.selectedCard !== -1;
    }

    decisionIsDisabled() {
        return this.model.status !== ProgramStatus.Progress;
    }

    reportIsDisabled() {
        return this.model.status !== ProgramStatus.Closable;
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
        this.model = new Program();
        this.selectedCard = -1;
        console.log(this.studentsKb);
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
}
