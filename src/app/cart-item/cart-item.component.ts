import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartItem';
import { CartItemService } from '../service/cart-item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  cartItems: CartItem[] = [];
  constructor(private cartItemsService: CartItemService) {}


  ngOnInit(): void {
    this.cartItemsService.getCartItems().subscribe((data: CartItem[]) => {
        // Process the received data from the backend
        console.log(data);
        this.cartItems = data;
      });
  }
}
