import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addItem agrega al carrito con POST y la cookie de sesión', () => {
    const http = TestBed.inject(HttpTestingController);
    let added: any;
    service.addItem('p1').subscribe((item) => (added = item));

    const req = http.expectOne(`${environment.baseUrl}/cart/p1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBeTrue();
    req.flush({ ok: true, item: { _id: 'p1' } });

    expect(added).toEqual({ _id: 'p1' } as any);
    http.verify();
  });
});
