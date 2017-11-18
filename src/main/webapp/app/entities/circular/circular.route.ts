import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CircularComponent } from './circular.component';
import { CircularDetailComponent } from './circular-detail.component';
import { CircularPopupComponent } from './circular-dialog.component';
import { CircularDeletePopupComponent } from './circular-delete-dialog.component';

@Injectable()
export class CircularResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const circularRoute: Routes = [
    {
        path: 'circular',
        component: CircularComponent,
        resolve: {
            'pagingParams': CircularResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.circular.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'circular/:id',
        component: CircularDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.circular.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const circularPopupRoute: Routes = [
    {
        path: 'circular-new',
        component: CircularPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.circular.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'circular/:id/edit',
        component: CircularPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.circular.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'circular/:id/delete',
        component: CircularDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.circular.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
