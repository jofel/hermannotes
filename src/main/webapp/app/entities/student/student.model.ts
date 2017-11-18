import { BaseEntity } from './../../shared';

const enum StudentStatus {
    'student',
    ' kb',
    ' senior'
}

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public studies?: string,
        public room?: number,
        public point?: number,
        public status?: StudentStatus,
    ) {
    }
}
