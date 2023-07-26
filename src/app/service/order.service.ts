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
    console.log("Order - " + orderId);
    console.log (this.getOrders());
    return this.getOrders().pipe(
      map(orders => orders.filter(order => 
        order.userId == orderId))
    );
  }
}
