import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { OrderItemService } from '../service/order-item.service';
import { OrderItem } from '../model/orderItem';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  username = '';
  userId = 0;
  // orderItems: OrderItem[] = [];
  orders: Order[] = [];
  isMyOrdersVisible: boolean = false;
  isShowMyBooksVisible: boolean = false;
  isShowPersonalInfo: boolean = false;
  
  constructor(public authService: AuthService, private router: Router,
              private orderItemService: OrderItemService, private orderService: OrderService
    ) {}

  ngOnInit() {
    //this.fetchOrderItem();
    //console.log("fetchOrderItem -" + this.fetchOrderItem());
    if (!this.authService.isAnyoneLoggedin()) {
    this.router.navigate(['/']);
    }
    else{
      // this.orderService.getOrderById(this.authService.loggedInUser.id).subscribe((data: Order[]) => {
      //   this.orders = data;
      // });
      // this.orderItemService.getOrderItemsById(this.authService.loggedInUser.id).subscribe((data: OrderItem[]) => {
      //   // Process the received data from the backend
        
      //   this.orderItems = data;
      //   console.log("dashboard - order items" + this.orderItems);
      // });
    }
  }

  showMyOrders() : void {
    this.isMyOrdersVisible = !this.isMyOrdersVisible;
    this.isShowMyBooksVisible = false;
    this.isShowPersonalInfo = false;
    this.orderService.getOrderById(this.authService.loggedInUser.id).subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  showPersonalInfo() {
    this.isMyOrdersVisible = false;
    this.isShowMyBooksVisible = false;
    this.isShowPersonalInfo = !this.isShowPersonalInfo;
  }



  // Function to show My Books
  showMyBooks() {
    this.isMyOrdersVisible = false;
    this.isShowMyBooksVisible = !this.isShowMyBooksVisible;
    this.isShowPersonalInfo = false;
  }


  getUserName(): string {
    // Check if the user is logged in and return the full name if available
    if (this.authService.isAnyoneLoggedin()) {
      const user = this.authService.loggedInUser;
      return user.firstName + ' ' + user.lastName;
    }
    return '';
  }

  logout(): void {
    // Set anyoneLoggedin to false
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
