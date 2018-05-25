import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HermannotesSharedModule } from '../../shared';
import { NoteComponent } from './note.component';
import { noteRoute } from './note.route';
import { NoteMembersComponent } from './note-members/note-members.component';
import { NoteNotaryComponent } from './note-notary/note-notary.component';
import { HermannotesProgramModule } from '../program/program.module';
import { NoteProgramComponent } from './note-program/note-program.component';
import { NoteProgramBoardComponent } from './note-program//note-program-board/note-program-board.component';

const ENTITY_STATES = [
    ...noteRoute,
];

@NgModule({
    imports: [
        HermannotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        HermannotesProgramModule
    ],
    declarations: [
        NoteComponent,
        NoteNotaryComponent,
        NoteMembersComponent,
        NoteProgramComponent,
        NoteProgramBoardComponent,
    ],
    entryComponents: [
        NoteComponent,
        NoteNotaryComponent,
        NoteMembersComponent,
        NoteProgramComponent,
        NoteProgramBoardComponent,
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HermannotesNoteModule { }
