import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCheckoutComponent } from './sidebar-checkout.component';

describe('SidebarCheckoutComponent', () => {
  let component: SidebarCheckoutComponent;
  let fixture: ComponentFixture<SidebarCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
