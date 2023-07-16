import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from '../model/orderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private orderItemUrl = "http://localhost:8080/orderItems";

  constructor(private http: HttpClient) { }

  getOrderItems(): Observable<OrderItem[]>{
    return this.http.get<OrderItem[]>(`${this.orderItemUrl}`)
  }

}
