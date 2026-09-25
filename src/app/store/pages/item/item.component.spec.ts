import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { StoreService } from '../../services/store.service';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let store: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    store = jasmine.createSpyObj<StoreService>('StoreService', ['getItemById', 'addItem']);
    store.getItemById.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ItemComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { params: of({ id: 'abc' }) } },
        { provide: StoreService, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pide el producto del id de la ruta', () => {
    expect(store.getItemById).toHaveBeenCalledWith('abc');
  });
});
