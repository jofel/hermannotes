import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { ProgramComponent } from '../program';

@Component({
    selector: 'jhi-note',
    templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit, OnDestroy {

    ngOnInit() { }

    ngOnDestroy() { }

}
