import { TestBed } from '@angular/core/testing';

import { SpotifySdkWebPlayerService } from './spotify-sdk-web-player.service';

describe('SpotifySdkWebPlayerService', () => {
  let service: SpotifySdkWebPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifySdkWebPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
