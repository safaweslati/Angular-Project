import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { savedTracksResolver } from './saved-tracks.resolver';

describe('savedTracksResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => savedTracksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
