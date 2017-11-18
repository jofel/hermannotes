import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HermannotesStudentModule } from './student/student.module';
import { HermannotesProgramModule } from './program/program.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HermannotesStudentModule,
        HermannotesProgramModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesEntityModule {}
