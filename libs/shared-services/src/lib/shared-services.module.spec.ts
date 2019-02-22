import { async, TestBed } from '@angular/core/testing';

import { SharedServicesModule } from './shared-services.module';

describe('SharedServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedServicesModule).toBeDefined();
  });
});
