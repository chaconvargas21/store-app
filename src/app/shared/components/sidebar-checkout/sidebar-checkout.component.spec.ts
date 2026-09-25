import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { StoreService } from '../../../store/services/store.service';
import { SidebarCheckoutComponent } from './sidebar-checkout.component';

describe('SidebarCheckoutComponent', () => {
  let component: SidebarCheckoutComponent;
  let fixture: ComponentFixture<SidebarCheckoutComponent>;

  beforeEach(async () => {
    const store = jasmine.createSpyObj<StoreService>('StoreService', ['getItemsCartShopping']);
    store.getItemsCartShopping.and.returnValue(of({ ok: true, items: [], totalPrice: 0 }));

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [SidebarCheckoutComponent],
      providers: [{ provide: StoreService, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
