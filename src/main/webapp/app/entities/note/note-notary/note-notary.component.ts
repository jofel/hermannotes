import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../student';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-note-notary',
    templateUrl: './note-notary.component.html'
})
export class NoteNotaryComponent implements OnInit, OnDestroy {

    students: Student[];

    constructor(
        private studentService: StudentService,
        private alertService: JhiAlertService,
    ) { }

    ngOnInit() {
        this.loadStudents();
    }

    ngOnDestroy() { }

    private loadStudents() {
        this.studentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.students = res.json;
                console.log(this.students);
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

}