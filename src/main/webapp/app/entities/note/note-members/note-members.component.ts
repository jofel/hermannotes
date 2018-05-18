import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { Student, StudentService } from '../../student';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-note-members',
    templateUrl: './note-members.component.html',
    styleUrls: ['./note-members.css']
})
export class NoteMembersComponent implements OnInit, OnDestroy {

    students: Student[];
    bgCard = -1;

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
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

}
