import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { StoreService } from '../../services/store.service';
import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    const store = jasmine.createSpyObj<StoreService>('StoreService', ['getItems']);
    store.getItems.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ShopComponent],
      providers: [provideRouter([]), provideNoopAnimations(), { provide: StoreService, useValue: store }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
