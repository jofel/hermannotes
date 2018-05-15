import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HermannotesSharedModule } from '../../shared';
import {
    ProgramService,
    ProgramPopupService,
    ProgramComponent,
    ProgramDetailComponent,
    ProgramDialogComponent,
    ProgramPopupComponent,
    ProgramDeletePopupComponent,
    ProgramDeleteDialogComponent,
    programRoute,
    programPopupRoute,
    ProgramResolvePagingParams,
    DateTimeFormatPipe,
} from './';

const ENTITY_STATES = [
    ...programRoute,
    ...programPopupRoute,
];

@NgModule({
    imports: [
        HermannotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProgramComponent,
        ProgramDetailComponent,
        ProgramDialogComponent,
        ProgramDeleteDialogComponent,
        ProgramPopupComponent,
        ProgramDeletePopupComponent,
        DateTimeFormatPipe,
    ],
    entryComponents: [
        ProgramComponent,
        ProgramDialogComponent,
        ProgramPopupComponent,
        ProgramDeleteDialogComponent,
        ProgramDeletePopupComponent,
        DateTimeFormatPipe,
    ],
    providers: [
        ProgramService,
        ProgramPopupService,
        ProgramResolvePagingParams,
    ],
    exports: [
        ProgramComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesProgramModule { }
