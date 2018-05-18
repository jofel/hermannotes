import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../student';
import { Program, ProgramService, ProgramStatus } from '../../program';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs/Rx';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-note-program',
    templateUrl: './note-program.component.html',
    styleUrls: ['./note-program.css']
})
export class NoteProgramComponent implements OnInit, OnDestroy {

    students: Student[];
    programs: Program[];
    cardColor = 'green';
    selectedCard = -1;
    model: Program;
    needToSave = false;
    isSaving: boolean;
    d: NgbDatepicker;
    dateOfDeclarationPicker: NgbDateStruct;

    constructor(
        private studentService: StudentService,
        private programService: ProgramService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
    ) {
        this.model = new Program();
    }

    ngOnInit() {
        this.loadStudents();
        this.loadPrograms();
    }

    ngOnclick() {

    }

    ngOnDestroy() { }

    private loadStudents() {
        this.studentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.students = res.json;
                // console.log(this.students);
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    loadPrograms() {
        this.programService.query().subscribe(
            (res: ResponseWrapper) => {
                this.programs = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            this.subscribeToSaveResponse(
                this.programService.update(this.model));

        } else {
            this.model.status = ProgramStatus.Plan;
            this.subscribeToSaveResponse(
                this.programService.create(this.model));
        }

        this.model = new Program();
    }

    private subscribeToSaveResponse(result: Observable<Program>) {
        result.subscribe((res: Program) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Program) {
        this.loadPrograms();
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

    cardActivated($event) {
        if ($event.target.className === 'card-text') {
            return this.cardColor = 'green';
        }
        return this.cardColor = 'red';
    }

    setSelectedCard(index: number) {
        if (this.selectedCard === index) {
            this.selectedCard = -1;
            this.model = new Program();
            return;
        } else {
            this.selectedCard = index;
            if (this.model) {
                this.model = this.programs[index];
                console.log(this.model);
            }
            this.needToSave = false;
            this.initDatePickerModel();
        }
    }

    planIsDisabled() {
        return this.model.status !== ProgramStatus.Plan && this.selectedCard !== -1;
    }

    decisionIsDisabled() {
        return this.model.status !== ProgramStatus.Progress;
    }

    reportIsDisabled() {
        return this.model.status !== ProgramStatus.Closed;
    }

    sendFromPlanToSuccess() {
        this.model.status = ProgramStatus.Progress;
        this.save();
    }

    sendFromSuccessToClosed() {
        this.model.status = ProgramStatus.Closed;
        this.save();
    }

    onSaveButton() {
        this.needToSave = false;
        this.save();
    }

    modelChanged() {
        this.needToSave = true;
    }

    onDatePickerChanged() {
        this.needToSave = true;
    }

    clean() {
        this.model = new Program();
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
}
