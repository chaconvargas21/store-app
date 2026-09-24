import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddItemResponse, GetItemByIdResponse, GetItemsCartShoppingResponse, GetItemsResponse, Item, RemoveItemResponse } from '../interfaces/item.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // POST/PATCH /order requieren el JWT en el header x-token (no Authorization).
  private authHeaders(): HttpHeaders {
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
  }

  // Si falla, lista vacía: el catálogo simplemente no muestra productos.
  getItems(): Observable<Item[]>{
    return this.http.get<GetItemsResponse>(`${this.baseUrl}/product`).pipe(
      map((resp) => {
        return resp.products;
      }),
      catchError(() => of([]))
    );
  }

  // 404 (producto inexistente) o id inválido: undefined, no el mensaje de error.
  getItemById(id: string): Observable<Item | undefined>{
    return this.http.get<GetItemByIdResponse>(`${this.baseUrl}/product/${id}`).pipe(
      map((resp) => {
        return resp.product;
      }),
      catchError(() => of(undefined))
    );
  }

  // Devuelve el producto agregado, o undefined si el backend no lo encontró.
  addItem(id: string): Observable<Item | undefined>{
    return this.http.get<AddItemResponse>(`${this.baseUrl}/cart/${id}`,{withCredentials: true}).pipe(
      map((resp) => {
        return resp.item;
      }),
      catchError(() => of(undefined))
    );
  }

  // El backend solo responde { ok } (no devuelve el producto quitado).
  removeItemCartShopping(id: string): Observable<boolean>{
    return this.http.delete<RemoveItemResponse>(`${this.baseUrl}/cart/${id}`,{withCredentials: true}).pipe(
      map((resp) => {
        return resp.ok;
      }),
      catchError(() => of(false))
    );
  }

  // Si falla, carrito vacío: los componentes leen items/totalPrice directamente.
  getItemsCartShopping():Observable<GetItemsCartShoppingResponse>{
    return this.http.get<GetItemsCartShoppingResponse>(`${this.baseUrl}/cart/`,{withCredentials: true}).pipe(
      catchError(()=> of({ ok: false, items: [], totalPrice: 0 }))
    );
  }

  // { order } es la orden de la sesión: el staging de postOrder (sin stripeId)
  // o, tras un pago exitoso, la Order ya pagada (con stripeId).
  getOrder(): Observable<{ order: any }> {
    return this.http.get<{ order: any }>(`${this.baseUrl}/order/`, {withCredentials: true}).pipe(
      catchError(() => of({ order: null }))
    );
  }

  // Sin catchError: el componente necesita el status HTTP (401 sin sesion).
  postOrder(data: { firstName: string, lastName: string, receipt_email: string, shipping: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/`, data, {withCredentials: true, headers: this.authHeaders()});
  }

  // Sin catchError: el componente distingue 402 (tarjeta rechazada, el
  // carrito se conserva para reintentar) de 401 y de otros errores.
  sendPayment(token: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/order/`, {token}, {withCredentials: true, headers: this.authHeaders()});
  }

  // Estado del PaymentIntent en Stripe. Solo tiene sentido si la orden de la
  // sesión tiene stripeId; si no, el backend responde 500 { error }.
  confirmOrder(): Observable<{ status: string | null }> {
    return this.http.get<{ status: string }>(`${this.baseUrl}/order/confirm`, {withCredentials: true}).pipe(
      catchError(() => of({ status: null }))
    );
  }

}
