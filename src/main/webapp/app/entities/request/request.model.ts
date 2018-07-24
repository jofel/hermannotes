import { BaseEntity } from './../../shared';

export const enum RequestStatus {
    Plan = 'plan',
    Progress = 'progress',
    Closable = 'closable',
    Closed = 'closed'
}

export class Request implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public date?: any,
        public time?: string,
        public content?: any,
        public contentcost?: number,
        public decision?: any,
        public decisioncost?: number,
        public status?: RequestStatus,
        public student?: BaseEntity,
        public messenger?: BaseEntity,
        public needToSave?: Boolean,
    ) {
        this.needToSave = false;
    }
}
