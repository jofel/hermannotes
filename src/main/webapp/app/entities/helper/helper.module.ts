import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HermannotesSharedModule } from '../../shared';
import {
    HelperService,
    HelperPopupService,
    HelperComponent,
    HelperDetailComponent,
    HelperDialogComponent,
    HelperPopupComponent,
    HelperDeletePopupComponent,
    HelperDeleteDialogComponent,
    helperRoute,
    helperPopupRoute,
    HelperResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...helperRoute,
    ...helperPopupRoute,
];

@NgModule({
    imports: [
        HermannotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HelperComponent,
        HelperDetailComponent,
        HelperDialogComponent,
        HelperDeleteDialogComponent,
        HelperPopupComponent,
        HelperDeletePopupComponent,
    ],
    entryComponents: [
        HelperComponent,
        HelperDialogComponent,
        HelperPopupComponent,
        HelperDeleteDialogComponent,
        HelperDeletePopupComponent,
    ],
    providers: [
        HelperService,
        HelperPopupService,
        HelperResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesHelperModule {}
