import { Injectable } from '@angular/core';
import { Validator } from '../../../../shared/validation/validator';
import { ValidationError } from '../../../../shared/validation/validation-error';
import { ValidationUtil } from '../../../../shared/validation/validation-util';
import { Request } from '../../../request/request.model';

@Injectable()
export class NoteRequestValidatorService implements Validator<Request> {
    validate(object: Request, errors: ValidationError[]): ValidationError[] {
        // this.validateBasic(object, errors);

        // if (object.status === undefined || object.status === ProgramStatus.Plan) {
        //     this.validatePlan(object, errors);
        // } else if (object.status === ProgramStatus.Progress) {
        //     this.validateProgress(object, errors);
        // } else if (object.status === ProgramStatus.Closable) {
        //     this.validateClosed(object, errors);
        // }

        return errors;
    }

    // private validateBasic(request: Request, errors: ValidationError[]) {
    //     ValidationUtil.isEmpty(request.title, 'title', 'hermannotesApp.program.val.title', errors);
    //     ValidationUtil.isEmpty(request.student.id, 'student', 'hermannotesApp.program.val.student', errors);
    //     ValidationUtil.isEmpty(request.date, 'date', 'hermannotesApp.program.val.date', errors);
    //     ValidationUtil.isEmpty(request.time, 'time', 'hermannotesApp.program.val.time', errors);
    // }

    // private validatePlan(request: Request, errors: ValidationError[]) {
    //     ValidationUtil.isEmpty(request.plan, 'plan', 'hermannotesApp.program.val.plan', errors);
    //     ValidationUtil.isEmpty(request.planCost, 'planCost', 'hermannotesApp.program.val.planCost', errors);
    // }
    // private validateProgress(request: Request, errors: ValidationError[]) {
    //     ValidationUtil.isEmpty(request.decision, 'decision', 'hermannotesApp.program.val.decision', errors);
    //     ValidationUtil.isEmpty(request.decisionCost, 'decisionCost', 'hermannotesApp.program.val.decisionCost', errors);
    // }

    // private validateClosed(request: Request, errors: ValidationError[]) {
    //     ValidationUtil.isEmpty(request.report, 'report', 'hermannotesApp.program.val.report', errors);
    //     ValidationUtil.isEmpty(request.reportCost, 'reportCost', 'hermannotesApp.program.val.reportCost', errors);
    // }

}
