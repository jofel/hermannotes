import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Program } from './program.model';
import { ProgramService } from './program.service';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class ProgramPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private dateTimeFormatPipe: DateTimeFormatPipe,
        private modalService: NgbModal,
        private router: Router,
        private programService: ProgramService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.programService.find(id).subscribe((program) => {
                    console.log('Before transform date: ' + program.date);
                    program.date = this.datePipe
                        .transform(program.date, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.programModalRef(component, program);
                    resolve(this.ngbModalRef);
                    console.log('After transform date: ' + program.date);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.programModalRef(component, new Program());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    programModalRef(component: Component, program: Program): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.program = program;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    DATE_TIME_FMT = 'yyyy-MM-ddThh:mm';
    transform(value: any, args?: any): any {
        return super.transform(value, this.DATE_TIME_FMT);
    }
}
