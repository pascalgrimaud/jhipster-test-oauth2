/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { TotoUpdateComponent } from 'app/entities/toto/toto-update.component';
import { TotoService } from 'app/entities/toto/toto.service';
import { Toto } from 'app/shared/model/toto.model';

describe('Component Tests', () => {
    describe('Toto Management Update Component', () => {
        let comp: TotoUpdateComponent;
        let fixture: ComponentFixture<TotoUpdateComponent>;
        let service: TotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TotoUpdateComponent]
            })
                .overrideTemplate(TotoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TotoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TotoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Toto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.toto = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Toto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.toto = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
