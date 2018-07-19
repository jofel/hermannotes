import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HelperComponent } from './helper.component';
import { HelperDetailComponent } from './helper-detail.component';
import { HelperPopupComponent } from './helper-dialog.component';
import { HelperDeletePopupComponent } from './helper-delete-dialog.component';

@Injectable()
export class HelperResolvePagingParams implements Resolve<any> {

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

export const helperRoute: Routes = [
    {
        path: 'helper',
        component: HelperComponent,
        resolve: {
            'pagingParams': HelperResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.helper.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'helper/:id',
        component: HelperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.helper.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const helperPopupRoute: Routes = [
    {
        path: 'helper-new',
        component: HelperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.helper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'helper/:id/edit',
        component: HelperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.helper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'helper/:id/delete',
        component: HelperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hermannotesApp.helper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
