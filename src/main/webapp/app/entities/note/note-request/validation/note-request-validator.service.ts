import { Injectable } from '@angular/core';
import { Validator } from '../../../../shared/validation/validator';
import { ValidationError } from '../../../../shared/validation/validation-error';
import { ValidationUtil } from '../../../../shared/validation/validation-util';
import { Request, RequestStatus } from '../../../request/request.model';

@Injectable()
export class NoteRequestValidatorService implements Validator<Request> {
    validate(object: Request, errors: ValidationError[]): ValidationError[] {
        if (object.status === undefined || object.status === RequestStatus.Plan) {
            this.validatePlan(object, errors);
        } else if (object.status === RequestStatus.Progress) {
            this.validateProgress(object, errors);
        } else if (object.status === RequestStatus.Closable) {
            this.validateClosed(object, errors);
        }

        return errors;
    }

    private validatePlan(request: Request, errors: ValidationError[]) {
        ValidationUtil.isEmpty(request.content, 'plan', 'hermannotesApp.request.val.content', errors);
        ValidationUtil.isEmpty(request.contentcost, 'planCost', 'hermannotesApp.request.val.contentcost', errors);
    }
    private validateProgress(request: Request, errors: ValidationError[]) {
        ValidationUtil.isEmpty(request.decision, 'decision', 'hermannotesApp.request.val.decision', errors);
        ValidationUtil.isEmpty(request.decisioncost, 'decisionCost', 'hermannotesApp.request.val.decisioncost', errors);
    }

    private validateClosed(request: Request, errors: ValidationError[]) {
        ValidationUtil.isEmpty(request.messenger, 'report', 'hermannotesApp.request.val.messenger', errors);
        ValidationUtil.isEmpty(request.notified, 'report', 'hermannotesApp.request.val.notified', errors);
        if (request.notified === false) {
            errors.push({ field: 'notified', message: 'hermannotesApp.request.val.notified' })
        }
    }

}
