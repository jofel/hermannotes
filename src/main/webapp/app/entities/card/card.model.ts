import { BaseEntity } from './../../shared';

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public lost?: boolean,
        public student?: BaseEntity,
    ) {
        this.lost = false;
    }
}
