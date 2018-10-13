import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
    TotoComponent,
    TotoDetailComponent,
    TotoUpdateComponent,
    TotoDeletePopupComponent,
    TotoDeleteDialogComponent,
    totoRoute,
    totoPopupRoute
} from './';

const ENTITY_STATES = [...totoRoute, ...totoPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TotoComponent, TotoDetailComponent, TotoUpdateComponent, TotoDeleteDialogComponent, TotoDeletePopupComponent],
    entryComponents: [TotoComponent, TotoUpdateComponent, TotoDeleteDialogComponent, TotoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTotoModule {}
