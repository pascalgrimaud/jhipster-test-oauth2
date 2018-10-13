import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Toto } from 'app/shared/model/toto.model';
import { TotoService } from './toto.service';
import { TotoComponent } from './toto.component';
import { TotoDetailComponent } from './toto-detail.component';
import { TotoUpdateComponent } from './toto-update.component';
import { TotoDeletePopupComponent } from './toto-delete-dialog.component';
import { IToto } from 'app/shared/model/toto.model';

@Injectable({ providedIn: 'root' })
export class TotoResolve implements Resolve<IToto> {
    constructor(private service: TotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((toto: HttpResponse<Toto>) => toto.body));
        }
        return of(new Toto());
    }
}

export const totoRoute: Routes = [
    {
        path: 'toto',
        component: TotoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Totos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'toto/:id/view',
        component: TotoDetailComponent,
        resolve: {
            toto: TotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Totos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'toto/new',
        component: TotoUpdateComponent,
        resolve: {
            toto: TotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Totos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'toto/:id/edit',
        component: TotoUpdateComponent,
        resolve: {
            toto: TotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Totos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const totoPopupRoute: Routes = [
    {
        path: 'toto/:id/delete',
        component: TotoDeletePopupComponent,
        resolve: {
            toto: TotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Totos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
