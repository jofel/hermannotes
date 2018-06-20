import { Injectable } from '@angular/core';
import { Validator } from '../../../../shared/validation/validator';
import { ValidationError } from '../../../../shared/validation/validation-error';
import { ValidationUtil } from '../../../../shared/validation/validation-util';
import { Program, ProgramStatus } from '../../../program/program.model';

@Injectable()
export class NoteProgramValidatorService implements Validator<Program> {
    validate(object: Program, errors: ValidationError[]): ValidationError[] {
        if (object.status === undefined || object.status === ProgramStatus.Plan) {
            this.validatePlan(object, errors);
        } else if (object.status === ProgramStatus.Progress) {
            this.validateProgress(object, errors);
        } else if (object.status === ProgramStatus.Closed) {
            this.validateClosed(object, errors);
        }

        return errors;
    }

    private validatePlan(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.title, 'title', 'hermannotesApp.program.val.title', errors);
    }
    private validateProgress(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.decision, 'decision', 'hermannotesApp.program.val.decision', errors);
    }

    private validateClosed(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.report, 'report', 'hermannotesApp.program.val.report', errors);
    }

    // private validateFelhasznalas1(object: TvModel, errors: ValidationError[]) {
    //     object.tvPartnerList.forEach((tvPartner) => {
    //         ValidationUtil.isEmpty(tvPartner.kijuttatasmodjaId, 'kijuttatasmodjaId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-kijuttatasmodjaId', errors);
    //     });
    // }

    // private validateFelhasznalas2(object: TvModel, errors: ValidationError[]) {
    //     object.tvtList.forEach((tvt) => {
    //         ValidationUtil.isEmpty(tvt.helyId, 'helyId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-helyId', errors);
    //         ValidationUtil.isEmpty(tvt.muvelesiagId, 'muvelesiagId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-muvelesiagId', errors);
    //         ValidationUtil.isEmpty(tvt.muszakibeavatkozasId, 'muszakibeavatkozasId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-muszakibeavatkozasId', errors);
    //     });
    //     this.validateLaborAdatok(object, errors);
    // }

    // private validateFelhasznalas3(object: TvModel, errors: ValidationError[]) {
    //     object.tvtList.forEach((tvt) => {
    //         ValidationUtil.isEmpty(tvt.helyId, 'helyId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-helyId', errors);
    //         ValidationUtil.isEmpty(tvt.muvelesiagId, 'muvelesiagId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-muvelesiagId', errors);
    //         ValidationUtil.isEmpty(tvt.nitraterzekeny, 'nitraterzekeny', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-nitraterzekeny', errors);
    //     });
    //     this.validateLaborAdatok(object, errors);
    // }

    // private validateFelhasznalas4(object: TvModel, errors: ValidationError[]) {
    //     object.tvtList.forEach((tvt) => {
    //         ValidationUtil.isEmpty(tvt.helyId, 'helyId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-helyId', errors);
    //         ValidationUtil.isEmpty(tvt.muvelesiagId, 'muvelesiagId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-muvelesiagId', errors);
    //         ValidationUtil.isEmpty(tvt.talajjavitasceljaId, 'talajjavitasceljaId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-talajjavitasceljaId', errors);
    //         ValidationUtil.isEmpty(tvt.novenyfajid, 'novenyfajid', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-novenyfajid-felh4', errors);
    //         ValidationUtil.isEmpty(tvt.hatoanyagid, 'hatoanyagid', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-hatoanyagid', errors);

    //         // ValidationUtil.isEmpty(tvt.mennyiseg, 'mennyiseg', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-mennyiseg-felh4', errors);
    //         // ValidationUtil.isEmpty(tvt.meId, 'meId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-meId-felh4', errors);
    //         // ValidationUtil.isEmpty(tvt.mennyiseg2, 'mennyiseg2', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-mennyiseg2-felh4', errors);
    //         ValidationUtil.isEmpty(tvt.me2Id, 'me2Id', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-me2Id-felh4', errors);
    //     });
    //     this.validateLaborAdatok(object, errors);
    // }

    // private validateFelhasznalas5(object: TvModel, errors: ValidationError[]) {
    //     object.tvtList.forEach((tvt) => {
    //         ValidationUtil.isEmpty(tvt.helyId, 'helyId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-helyId', errors);
    //         ValidationUtil.isEmpty(tvt.muvelesiagId, 'muvelesiagId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-muvelesiagId', errors);
    //         ValidationUtil.isEmpty(tvt.anyagtipusaveszelyesId, 'anyagtipusaveszelyesId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-anyagtipusaveszelyesId', errors);
    //         // ValidationUtil.isEmpty(tvt.mennyiseg, 'mennyiseg', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-mennyiseg-felh5', errors);
    //         // ValidationUtil.isEmpty(tvt.meId, 'meId', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-meId-felh5', errors);
    //         ValidationUtil.isEmpty(tvt.nitraterzekeny, 'nitraterzekeny', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-nitraterzekeny', errors);
    //         // ValidationUtil.isEmpty(tvt.novenyfajid, 'novenyfajid', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-novenyfajid-felh5', errors);
    //         // ValidationUtil.isEmpty(tvt.mennyiseg2, 'mennyiseg2', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-mennyiseg2-felh5', errors);
    //         // ValidationUtil.isEmpty(tvt.me2Id, 'me2Id', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-me2Id-felh5', errors);
    //     });
    //     this.validateLaborAdatok(object, errors);
    // }

    // private validateLaborAdatok(object: TvModel, errors: ValidationError[]) {
    //     object.tvtList.forEach((tvt) => {
    //         ValidationUtil.isEmpty(tvt.hrszterulet, 'hrszterulet', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-hrszterulet', errors);
    //         ValidationUtil.isEmpty(tvt.hrszengterulet, 'hrszengterulet', 'tnairApp.soilProtection.tv01-tv06.felhasznalas.val.felh-hrszengterulet', errors);
    //     })
    // }
}
