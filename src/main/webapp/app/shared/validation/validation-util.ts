import { ValidationError } from './validation-error';

export class ValidationUtil {
    /**
     * Adds a validation error if a given field in the object was empty.
     * @param  {any} object the validated value
     * @param  {string} fieldName some name for the field (arbitrary)
     * @param  {string} message the message displayed to the user
     * @param  {ValidationError[]} errorArray the array of errors where the function will push if empty
     */
    static isEmpty(object: any, fieldName: string, message: string, errorArray: ValidationError[]) {
        if (!object && !(typeof object === 'number' && object === 0) && !(typeof object === 'boolean' && object === false)) {
            errorArray.push(new ValidationError(fieldName, message));
        }
    }
}
