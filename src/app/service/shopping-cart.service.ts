import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shopingCartpage = "http://localhost:8080/shoppingCarts";

  constructor(private http: HttpClient) {}

    getShoppingCart(): Observable <ShoppingCart[]>{
    return this.http.get<ShoppingCart[]>(this.shopingCartpage);
   }

   getShoppingCartById(id: string): Observable<ShoppingCart> {
    const url = `${this.shopingCartpage}/${id}`;
    return this.http.get<ShoppingCart>(url);
  }

}
