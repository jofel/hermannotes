import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../student';
import { Program, ProgramService, ProgramStatus } from '../../program';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';
import { Observable } from 'rxjs/Rx';

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
                // console.log(this.programs);
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            console.log('save -> update');
            this.subscribeToSaveResponse(
                this.programService.update(this.model));

        } else {
            console.log('save -> create');
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

    cardActivated($event) {
        console.log($event.target.className);
        if ($event.target.className === 'card-text') {
            return this.cardColor = 'green';
        }
        return this.cardColor = 'red';
    }

    setSelectedCard(index: number) {
        if (this.selectedCard === index) {
            return;
        } else {
            this.selectedCard = index;
            if (this.model) {
                this.model = this.programs[index];
            }
            this.needToSave = false;
        }
    }

    planIsDisabled() {
        return this.model.status !== ProgramStatus.Plan;
    }

    decisionIsDisabled() {
        return this.model.status !== ProgramStatus.Progress;
    }

    reportIsDisabled() {
        return this.model.status !== ProgramStatus.Closed;
    }

    sendFromPlanToSuccess() {
        console.log('Next Button clicked!!');
        this.model.status = ProgramStatus.Progress;
        this.save();
    }

    sendFromSuccessToClosed() {
        console.log('Next Button clicked!!');
        this.model.status = ProgramStatus.Closed;
    }

    closed() {
        console.log('Closed Button clicked!!');
    }

    onSaveButton() {
        console.log('Save Button clicked!! ');
        console.log(this.model);
        // this.save();
    }

    modelChanged() {
        this.needToSave = true;
    }
}
