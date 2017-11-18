import { BaseEntity } from './../../shared';

const enum DayOfWeek {
    'monday',
    ' tuesday',
    ' wednesday',
    ' thursday',
    ' friday',
    ' saturday',
    ' sunday'
}

export class Circular implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public day?: DayOfWeek,
        public time?: string,
        public locale?: string,
        public content?: any,
        public image?: string,
        public active?: boolean,
        public student?: BaseEntity,
    ) {
        this.active = false;
    }
}
