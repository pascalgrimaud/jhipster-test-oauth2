import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IToto } from 'app/shared/model/toto.model';
import { TotoService } from './toto.service';

@Component({
    selector: 'jhi-toto-update',
    templateUrl: './toto-update.component.html'
})
export class TotoUpdateComponent implements OnInit {
    toto: IToto;
    isSaving: boolean;

    constructor(private totoService: TotoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ toto }) => {
            this.toto = toto;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.toto.id !== undefined) {
            this.subscribeToSaveResponse(this.totoService.update(this.toto));
        } else {
            this.subscribeToSaveResponse(this.totoService.create(this.toto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IToto>>) {
        result.subscribe((res: HttpResponse<IToto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
