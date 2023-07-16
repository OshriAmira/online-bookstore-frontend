import { CartItem } from "./cartItem";

export class ShoppingCart {
    id: number=0;
    userID: number=0;
    userName: string="";
    cartItems: CartItem[] = [];
}

