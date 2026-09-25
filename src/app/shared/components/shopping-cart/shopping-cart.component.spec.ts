import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { StoreService } from '../../../store/services/store.service';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    const store = jasmine.createSpyObj<StoreService>('StoreService', ['getItemsCartShopping']);
    store.getItemsCartShopping.and.returnValue(of({ ok: true, items: [], totalPrice: 0 }));

    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ShoppingCartComponent],
      providers: [
        provideRouter([]),
        { provide: StoreService, useValue: store },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
