import { BaseEntity } from './../../shared';

export class Helper implements BaseEntity {
    constructor(
        public id?: number,
        public program?: BaseEntity,
        public student?: BaseEntity,
    ) {
    }
}
