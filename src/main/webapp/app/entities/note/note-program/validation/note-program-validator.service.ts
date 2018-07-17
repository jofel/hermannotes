import { Injectable } from '@angular/core';
import { Validator } from '../../../../shared/validation/validator';
import { ValidationError } from '../../../../shared/validation/validation-error';
import { ValidationUtil } from '../../../../shared/validation/validation-util';
import { Program, ProgramStatus } from '../../../program/program.model';

@Injectable()
export class NoteProgramValidatorService implements Validator<Program> {
    validate(object: Program, errors: ValidationError[]): ValidationError[] {
        this.validateBasic(object, errors);

        if (object.status === undefined || object.status === ProgramStatus.Plan) {
            this.validatePlan(object, errors);
        } else if (object.status === ProgramStatus.Progress) {
            this.validateProgress(object, errors);
        } else if (object.status === ProgramStatus.Closable) {
            this.validateClosed(object, errors);
        }

        return errors;
    }

    private validateBasic(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.title, 'title', 'hermannotesApp.program.val.title', errors);
        ValidationUtil.isEmpty(program.student.id, 'student', 'hermannotesApp.program.val.student', errors);
        ValidationUtil.isEmpty(program.date, 'date', 'hermannotesApp.program.val.date', errors);
        ValidationUtil.isEmpty(program.time, 'time', 'hermannotesApp.program.val.time', errors);
    }

    private validatePlan(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.plan, 'plan', 'hermannotesApp.program.val.plan', errors);
        ValidationUtil.isEmpty(program.planCost, 'planCost', 'hermannotesApp.program.val.planCost', errors);
    }
    private validateProgress(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.decision, 'decision', 'hermannotesApp.program.val.decision', errors);
        ValidationUtil.isEmpty(program.decisionCost, 'decisionCost', 'hermannotesApp.program.val.decisionCost', errors);
    }

    private validateClosed(program: Program, errors: ValidationError[]) {
        ValidationUtil.isEmpty(program.report, 'report', 'hermannotesApp.program.val.report', errors);
        ValidationUtil.isEmpty(program.reportCost, 'reportCost', 'hermannotesApp.program.val.reportCost', errors);
    }

}
