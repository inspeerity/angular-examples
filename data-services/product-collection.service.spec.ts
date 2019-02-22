import { TestBed, async, inject, fakeAsync, tick } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MockBackend } from "@angular/http/testing";
import {
  ResponseOptions,
  Response,
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  RequestOptions,
  RequestMethod
} from "@angular/http";

import { IProductCollection } from "./product-collection";
import { SingleCollection } from "./collection.mock";

import { ProductCollectionService } from "./product-collection.service";

describe("Service: ProductCollection", () => {
  const COLLECTION_1 = {
    id: 1,
    name: "collection1"
  };
  const COLLECTION_2 = {
    id: 2,
    name: "collection2"
  };
  const newProductCollection: IProductCollection = {
    name: "test collection",
    parentId: 1,
    type: "ITEM_COLLECTION",
    description: ""
  };
  const response = {
    collections: [COLLECTION_1, COLLECTION_2]
  };
  let service, lastConnection;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductCollectionService,
        {
          provide: ConnectionBackend,
          useClass: MockBackend
        },
        {
          provide: RequestOptions,
          useClass: BaseRequestOptions
        },
        Http
      ],
      // Tells the compiler not to error on unknown elements and attributes
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.get(ProductCollectionService);
  });

  beforeEach(inject([ConnectionBackend], (mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      (connection: any) => (lastConnection = connection)
    );
  }));

  it("create() should query current service url", async(() => {
    service.create(newProductCollection);
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toEqual(
      `${ProductCollectionService.COLLECTION_URL}`
    );
  }));

  it("create() should return correct response", fakeAsync(() => {
    let result: IProductCollection;

    service.create(newProductCollection).subscribe(resp => {
      result = resp;
    });
    lastConnection.mockRespond(
      new Response(
        new ResponseOptions({
          body: newProductCollection
        })
      )
    );
    tick();
    expect(result).toEqual(newProductCollection);
  }));

  it("create() when servers is down", fakeAsync(() => {
    let result: IProductCollection;
    let catchedError: any;
    service
      .create(newProductCollection)
      .subscribe(
        resp => (result = resp),
        (error: any) => (catchedError = error)
      );
    lastConnection.mockError("URL not found!");
    tick();

    expect(result).toBeUndefined();
    expect(catchedError).toBeDefined();
    expect(catchedError).toBe("URL not found!");
  }));

  it("create() when servers return error", fakeAsync(() => {
    let result: IProductCollection;
    let catchedError: any;
    service
      .create(newProductCollection)
      .subscribe(
        resp => (result = resp),
        (error: any) => (catchedError = error)
      );
    lastConnection.mockError(
      new Response(
        new ResponseOptions({
          body: {
            message: "URL not found!"
          }
        })
      )
    );
    tick();

    expect(result).toBeUndefined();
    expect(catchedError).toBeDefined();
    expect(catchedError).toBe("URL not found!");
  }));

  it(`getCollection() should GET ${
    ProductCollectionService.COLLECTION_URL
  }/{id}`, async(() => {
    const id = 32;
    service.getCollection(id);
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toEqual(
      `${ProductCollectionService.COLLECTION_URL}/${id}`
    );
    expect(lastConnection.request.method).toBe(RequestMethod.Get);
  }));

  it(`getCategories() should GET data from ${
    ProductCollectionService.COLLECTION_URL
  }/{id}/categories`, async(() => {
    const id = 32;
    service.getCategories(id);
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toEqual(
      `${ProductCollectionService.COLLECTION_URL}/${id}/categories`
    );
    expect(lastConnection.request.method).toBe(RequestMethod.Get);
  }));

  it(`removeCollection() should http.delete ${
    ProductCollectionService.COLLECTION_URL
  }/{id}`, fakeAsync(() => {
    spyOn(notificationService, "success").and.callThrough();
    service.removeCollection(SingleCollection).subscribe(resp => {});
    lastConnection.mockRespond(
      new Response(
        new ResponseOptions({
          body: {
            message: "All ok"
          }
        })
      )
    );
    tick();
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toEqual(
      `${ProductCollectionService.COLLECTION_URL}/${SingleCollection.id}`
    );
    expect(lastConnection.request.method).toBe(RequestMethod.Delete);
  }));

  it(`removeCollection() should show error`, fakeAsync(() => {
    spyOn(notificationService, "error").and.callThrough();
    service.removeCollection(SingleCollection).subscribe(resp => {}, () => {});
    lastConnection.mockError(
      new Response(
        new ResponseOptions({
          body: {
            message: "Collection not found!"
          }
        })
      )
    );
    tick();
  }));
});
