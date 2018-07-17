import { BaseEntity } from './../../shared';

export const enum StudentStatus {
    Student = 'student',
    Kb = 'kb',
    Senior = 'senior'
}

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public studies?: string,
        public room?: number,
        public point?: number,
        public status?: StudentStatus,

        public checked?: boolean,
    ) {
    }
}
