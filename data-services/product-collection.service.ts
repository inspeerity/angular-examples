import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/publishLast";

import { API_URL } from "./../app.const";
import { IProductCollection } from "./product-collection";
import { Category } from "./category";

@Injectable()
export class ProductCollectionService {
  static COLLECTION_URL = `${API_URL}/collections`;
  static CATEGORY_URL = `${API_URL}/category`;

  constructor(private http: Http) {}

  /**
   * Send a request to the backend containing search term
   * @param collection Search term.
   * @return Object<IProductCollection> as observable containing created collection
   */
  create(collection: IProductCollection): Observable<IProductCollection> {
    return this.http
      .post(`${ProductCollectionService.COLLECTION_URL}`, collection)
      .map(this.convertResponse)
      .catch((error: any) => this.errorHandler(error))
      .publishLast()
      .refCount();
  }

  /**
   * Send update request for collection to back-end
   * @param collection updated data
   * @return Object<IProductCollection> as observable containing updated collection
   */
  update(collection: IProductCollection): Observable<IProductCollection> {
    return this.http
      .put(
        `${ProductCollectionService.COLLECTION_URL}/${collection.id}`,
        collection
      )
      .map(this.convertResponse)
      .catch((error: any) => this.errorHandler(error))
      .publishLast()
      .refCount();
  }

  /**
   * Sends an delete request for a given collection
   * @param {IProductCollection} Collection
   */
  removeCollection(collection: IProductCollection) {
    return this.http
      .delete(`${ProductCollectionService.COLLECTION_URL}/${collection.id}`)
      .map(res => res.json())
      .catch((error: any) => {
        return this.errorHandler(error);
      })
      .publishLast()
      .refCount();
  }

  /**
   * Returns an collection list
   * @returns Requested Collection list as a Observable
   */
  getCollections(): Observable<IProductCollection[]> {
    return this.http
      .get(`${ProductCollectionService.COLLECTION_URL}/`)
      .map(res => res.json().collections as IProductCollection[])
      .catch((error: any) => this.errorHandler(error))
      .publishLast()
      .refCount();
  }

  /**
   * Returns an collection details object (without usnspsc categories)
   * @param id Collection ID
   * @returns Requested Collection as a Observable
   */
  getCollection(id: number): Observable<IProductCollection> {
    return this.http
      .get(`${ProductCollectionService.COLLECTION_URL}/${id}`)
      .map(res => res.json() as IProductCollection)
      .publishLast()
      .refCount();
  }

  /**
   * Request a list of UNSPSC categories for a given collection
   * @param id Collection ID
   * @returns List of UNSPSC categories as an Observable
   */
  getCategories(id: number): Observable<Category[]> {
    return this.http
      .get(`${ProductCollectionService.COLLECTION_URL}/${id}/categories`)
      .map(res => res.json().categories as Category[])
      .publishLast()
      .refCount();
  }

  private convertResponse = (response: Response) => response.json();

  private errorHandler(error: any) {
    if (error instanceof Response) {
      return Observable.throw(
        error.json().message || "[collection] backend server error"
      );
    }
    return Observable.throw(error || "[collection] backend server error");
  }
}
