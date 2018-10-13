/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { TotoComponent } from 'app/entities/toto/toto.component';
import { TotoService } from 'app/entities/toto/toto.service';
import { Toto } from 'app/shared/model/toto.model';

describe('Component Tests', () => {
    describe('Toto Management Component', () => {
        let comp: TotoComponent;
        let fixture: ComponentFixture<TotoComponent>;
        let service: TotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TotoComponent],
                providers: []
            })
                .overrideTemplate(TotoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TotoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TotoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Toto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.totos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
