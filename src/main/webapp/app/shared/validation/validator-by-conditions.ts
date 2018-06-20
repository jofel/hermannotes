
import { ValidationError } from './validation-error';

export interface ValidatorByConditions<T> {
    validateByConditions(object: T, errors: ValidationError[], ...conditions: boolean[]): ValidationError[];
}
