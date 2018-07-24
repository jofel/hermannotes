import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Circular } from './circular.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CircularService {

    private resourceUrl = 'api/circulars';

    constructor(private http: Http) { }

    create(circular: Circular): Observable<Circular> {
        const copy = this.convert(circular);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(circular: Circular): Observable<Circular> {
        const copy = this.convert(circular);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Circular> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(circular: Circular): Circular {
        const copy: Circular = Object.assign({}, circular);
        return copy;
    }
}
