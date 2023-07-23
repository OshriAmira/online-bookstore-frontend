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
    return this.http.get<OrderItem[]>(`${this.orderItemUrl}`)
  }


  getOrderItemsById(OrderItemId: number): Observable<OrderItem[]> {
    console.log("getById");
    console.log(OrderItemId);
    console.log (this.getOrderItems());
    return this.getOrderItems().pipe(
      map(orderItems => orderItems.filter(orderItem => 
        orderItem.orderId === OrderItemId))
    );
  }


}
