import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CategoryStateService } from './category-state.service';
import { ProductCollectionService } from './../product-collection.service';
import { MultipleUNSPSC } from './../collection.mock';


describe('CategoryStateService', () => {
    let categoryStateService: CategoryStateService, productCollectionService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                CategoryStateService,
                {
                    provide: ProductCollectionService,
                    useValue: {
                        getCategories: (id) => {}
                    }
                }
            ]
        });
        categoryStateService = TestBed.get(CategoryStateService);
        productCollectionService = TestBed.get(ProductCollectionService);
    }));

    it('should create a service', () => {
        expect(categoryStateService).toBeTruthy();
    });

    it ('should hande loadCategories() method', () => {
        const id = 1;
        let result;
        categoryStateService.categories
            .subscribe(res => result = res);
        const spy = spyOn(productCollectionService, 'getCategories')
            .and.returnValue(Observable.of(MultipleUNSPSC));
        categoryStateService.loadCategories(id);
        expect(spy).toHaveBeenCalledWith(id);
        expect(result).toBe(MultipleUNSPSC);
    });


});
