import { async, TestBed } from "@angular/core/testing";

import { PactServicesModule } from "./pact-services.module";

describe("PactServicesModule", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PactServicesModule]
    }).compileComponents();
  }));

  it("should create", () => {
    expect(PactServicesModule).toBeDefined();
  });
});
