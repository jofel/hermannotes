import { BaseEntity } from './../../shared';

const enum ProgramStatus {
    'plan',
    ' progress',
    ' closed'
}

export class Program implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public date?: any,
        public plan?: any,
        public planCost?: number,
        public decision?: any,
        public decisionCost?: number,
        public report?: any,
        public reportCost?: number,
        public status?: ProgramStatus,
        public student?: BaseEntity,
    ) {
    }
}
