import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from './../category';
import { ProductCollectionService } from './../product-collection.service';

/**
 * Data service for categories from collection.
 */
@Injectable()
export class CategoryStateService {

    private _categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    constructor(private productCollectionService: ProductCollectionService) { }

    // Observable from _categories Subject.
    get categories() {
        return this._categories.asObservable();
    }

    /**
     * Get categories from Product Collection Service
     * and feed a new values to the _categories Subject
     * @param id Collection id.
     */
    loadCategories(id: number) {
        const observable = this.productCollectionService.getCategories(id);
        observable
            .subscribe(
                (res: Category[]) => this._categories.next(res)
            );
        return observable;
    }

    editCategory(id, props) {
        const currentCategories = this._categories.getValue();
        const editedCategory = currentCategories.find(category => category.id === id);
        if (editedCategory) {
            Object.assign(editedCategory, props);
            this._categories.next(currentCategories);
        }
    }

}
