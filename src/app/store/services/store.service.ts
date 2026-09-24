import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddItemResponse, GetItemByIdResponse, GetItemsCartShoppingResponse, GetItemsResponse, Item, ItemCart, RemoveItemResponse } from '../interfaces/item.interface';
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

  getItems(): Observable<Item[]>{
    return this.http.get<GetItemsResponse>(`${this.baseUrl}/product`).pipe(
      map((resp) => {
        return resp.products;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  getItemById(id: string): Observable<Item>{
    return this.http.get<GetItemByIdResponse>(`${this.baseUrl}/product/${id}`).pipe(
      map((resp) => {
        return resp.product;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  addItem(id: string): Observable<Item>{
    return this.http.get<AddItemResponse>(`${this.baseUrl}/cart/${id}`,{withCredentials: true}).pipe(
      map((resp) => {
        return resp.item;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  removeItemCartShopping(id: string): Observable<Item>{
    return this.http.delete<RemoveItemResponse>(`${this.baseUrl}/cart/${id}`,{withCredentials: true}).pipe(
      map((resp) => {
        return resp.item;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  getItemsCartShopping():Observable<GetItemsCartShoppingResponse>{
    return this.http.get<GetItemsCartShoppingResponse>(`${this.baseUrl}/cart/`,{withCredentials: true}).pipe(
      // map((resp)=>{
      //   return resp.items
      // }),
      catchError((err)=> of(err.error.msg))
    );
  }

  getOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/`, {withCredentials: true}).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => of(err.error.msg))
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


  confirmOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/confirm`, {withCredentials: true}).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

}
