import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HermannotesStudentModule } from './student/student.module';
import { HermannotesProgramModule } from './program/program.module';
import { HermannotesCircularModule } from './circular/circular.module';
import { HermannotesCardModule } from './card/card.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HermannotesStudentModule,
        HermannotesProgramModule,
        HermannotesCircularModule,
        HermannotesCardModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesEntityModule {}
