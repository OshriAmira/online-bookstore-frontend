import { OrderItem } from "./orderItem";

export class Order {
    id: number = 0;
    userId: number = 0;
    userName: string = "";
    createdDate: Date = new Date(1900, 0, 1); // Format: new Date(year, monthIndex, day)
    modifiedDate: Date = new Date(1900, 0, 1);
    totalPrice: number = 0;
    status: string = "";
    orderItems: OrderItem[] = [];
  }