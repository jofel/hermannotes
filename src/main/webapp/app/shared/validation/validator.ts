
import { ValidationError } from './validation-error';

export interface Validator<T> {
    validate(object: T, errors: ValidationError[], ...otherArgs): ValidationError[];
}
