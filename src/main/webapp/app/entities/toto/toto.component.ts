import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IToto } from 'app/shared/model/toto.model';
import { Principal } from 'app/core';
import { TotoService } from './toto.service';

@Component({
    selector: 'jhi-toto',
    templateUrl: './toto.component.html'
})
export class TotoComponent implements OnInit, OnDestroy {
    totos: IToto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private totoService: TotoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.totoService.query().subscribe(
            (res: HttpResponse<IToto[]>) => {
                this.totos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IToto) {
        return item.id;
    }

    registerChangeInTotos() {
        this.eventSubscriber = this.eventManager.subscribe('totoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
