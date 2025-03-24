import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SERVER_URL } from '../../lib/constans';
import { Order } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = SERVER_URL;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + 'getOrders').pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to fetch orders');
        return throwError(() => err);
      })
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl + 'addOrder', order).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to create order');
        return throwError(() => err);
      })
    );
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}updateOrder/${id}`, order).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to update order');
        return throwError(() => err);
      })
    );
  }

  deleteOrder(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deleteOrder/${id}`).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to delete order');
        return throwError(() => err);
      })
    );
  }
}
