import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { ProgramComponent } from '../program';

@Component({
    selector: 'jhi-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.css'],
    encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit, OnDestroy {

    ngOnInit() { }

    ngOnDestroy() { }

}
