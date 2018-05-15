import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NoteComponent } from './note.component';

export const noteRoute: Routes = [
    {
        path: 'note',
        component: NoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
