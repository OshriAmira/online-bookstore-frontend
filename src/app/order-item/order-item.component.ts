import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../model/orderItem';
import { OrderItemService } from '../service/order-item.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit{

  orderItems: OrderItem[] = [];

  constructor(private orderItemService: OrderItemService){}


  ngOnInit(): void {
    this.orderItemService.getOrderItems().subscribe((data: OrderItem[]) => {
        // Process the received data from the backend
        console.log(data);
        this.orderItems = data;
      });
  }


}
