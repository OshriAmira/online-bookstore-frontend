import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderItem } from '../model/orderItem';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private orderItemUrl = "http://localhost:8080/orderItems";

  private orderItems: OrderItem[] = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  getOrderItems(): Observable<OrderItem[]>{
    console.log("enter  - getOrderItems");
    return this.http.get<OrderItem[]>(this.orderItemUrl)
  }


  getOrderItemsById(orderItemId: number): Observable<OrderItem[]> {
    console.log("OrderItemId - " + orderItemId);
    console.log (this.getOrderItems());
    return this.getOrderItems().pipe(
      map(orderItems => orderItems.filter(orderItem => 
        orderItem.orderId == orderItemId))
    );
  }


}
