import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../model/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = "http://localhost:8080/orders";

  private orders: Order[] = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  getOrders(): Observable<Order[]>{
    console.log("enter  - getOrders");
    return this.http.get<Order[]>(this.ordersUrl)
  }

  getOrderById(orderId: number): Observable<Order[]> {
    return this.getOrders().pipe(
      map(orders => orders.filter(order => 
        order.id == orderId))
    );
  }


  getOrderByUserId(userId: number): Observable<Order[]> {
    return this.getOrders().pipe(
      map(orders => orders.filter(order => 
        order.userId == userId))
    );
  }

  getOrdersByStatus(userId: number,orderStatus: string): Observable<Order[]> {
    return this.getOrderByUserId(userId).pipe(
      map(orders => orders.filter(order => 
        order.status == orderStatus))
    );
  }


}




