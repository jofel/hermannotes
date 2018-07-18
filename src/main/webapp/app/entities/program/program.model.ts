import { BaseEntity } from './../../shared';
import { Student } from '../student';

export const enum ProgramStatus {
    Plan = 'plan',
    Progress = 'progress',
    Closable = 'closable',
    Closed = 'closed'
}

export class Program implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public date?: any,
        public time?: string,
        public plan?: any,
        public planCost?: number,
        public decision?: any,
        public decisionCost?: number,
        public report?: any,
        public reportCost?: number,
        public status?: ProgramStatus,
        public student?: BaseEntity,
        public needToSave?: boolean,
        public closed?: boolean,
        public helpers?: Student[],
    ) {
        this.needToSave = false;
        this.closed = false;
        this.student = new Student();
        this.helpers = [];
        this.helpers.push(new Student());
    }
}
