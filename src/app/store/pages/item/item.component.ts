import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item?: Item;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.storeService.getItemById(id)))
      .subscribe((resp) => {
        this.item = resp;
      });
  }

  ngOnInit(): void {}

  addItem() {
    if (!this.item) return;
    this.storeService.addItem(this.item._id).subscribe((added) => {
      this.snackBar.open(
        added ? 'Agregado al carrito' : 'No se pudo agregar al carrito',
        'Cerrar',
        {
          duration: 3000,
          panelClass: added ? 'snackbar-success' : 'snackbar-danger',
        }
      );
    });
  }
}
