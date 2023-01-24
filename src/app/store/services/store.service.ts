import { HttpClient } from '@angular/common/http';
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

  getItems(): Observable<Item[]>{
    return this.http.get<GetItemsResponse>(`${this.baseUrl}/item/`).pipe(
      map((resp) => {
        return resp.items;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  getItemById(id: string): Observable<Item>{
    return this.http.get<GetItemByIdResponse>(`${this.baseUrl}/item/${id}`).pipe(
      map((resp) => {
        return resp.item;
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

  postOrder(data: { firstName: string, lastName: string, receipt_email: string, shipping: any }): Observable<any> {
    console.log(`${this.baseUrl}/order/`, data, {withCredentials: true})
    return this.http.post(`${this.baseUrl}/order/`, data, {withCredentials: true}).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  sendPayment(token: string): Observable<any> {
    console.log(`${this.baseUrl}/order/`, {token}, {withCredentials: true})
    return this.http.patch(`${this.baseUrl}/order/`, {token}, {withCredentials: true}).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => of(err.error.msg))
    );
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
