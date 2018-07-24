import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HermannotesSharedModule } from '../../shared';
import {
    CircularService,
    CircularPopupService,
    CircularComponent,
    CircularDetailComponent,
    CircularDialogComponent,
    CircularGenerateComponent,
    CircularPopupComponent,
    CircularDeletePopupComponent,
    CircularDeleteDialogComponent,
    circularRoute,
    circularPopupRoute,
    CircularResolvePagingParams,
} from '.';

const ENTITY_STATES = [
    ...circularRoute,
    ...circularPopupRoute,
];

@NgModule({
    imports: [
        HermannotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CircularComponent,
        CircularDetailComponent,
        CircularDialogComponent,
        CircularGenerateComponent,
        CircularDeleteDialogComponent,
        CircularPopupComponent,
        CircularDeletePopupComponent,
    ],
    entryComponents: [
        CircularComponent,
        CircularDialogComponent,
        CircularGenerateComponent,
        CircularPopupComponent,
        CircularDeleteDialogComponent,
        CircularDeletePopupComponent,
    ],
    providers: [
        CircularService,
        CircularPopupService,
        CircularResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesCircularModule {}
