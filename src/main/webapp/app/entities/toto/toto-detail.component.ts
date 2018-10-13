import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToto } from 'app/shared/model/toto.model';

@Component({
    selector: 'jhi-toto-detail',
    templateUrl: './toto-detail.component.html'
})
export class TotoDetailComponent implements OnInit {
    toto: IToto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ toto }) => {
            this.toto = toto;
        });
    }

    previousState() {
        window.history.back();
    }
}
