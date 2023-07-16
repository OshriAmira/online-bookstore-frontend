import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: ShoppingCart | null = null;
  numItems: number = 0;

  constructor(private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    const shoppingCartId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shoppingCartService.getShoppingCartById(shoppingCartId).subscribe((data: ShoppingCart) => {
      this.shoppingCart = data;
      this.calculateNumItems();
    });
  }

  calculateNumItems(): void {
    if (this.shoppingCart?.cartItems) {
      this.numItems = this.shoppingCart.cartItems.length;
    } else {
      this.numItems = 0;
    }
  }

  getCartItemDetails(cartItems: any[]): string {
    return cartItems.map(item => `${item.book} (Quantity: ${item.quantity})`).join(", ");
  }
}
