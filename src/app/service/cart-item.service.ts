import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private cartItemsPageUrl = "http://localhost:8080/cartItems";

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${this.cartItemsPageUrl}`);
  }
}
