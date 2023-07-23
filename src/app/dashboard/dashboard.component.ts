import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { OrderItemService } from '../service/order-item.service';
import { OrderItem } from '../model/orderItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  username = '';
  userId = 0;
  orderItems: OrderItem[] = [];
  
  constructor(public authService: AuthService, private router: Router,
              private orderItemService: OrderItemService
    ) {}

  ngOnInit() {
    if (!this.authService.isAnyoneLoggedin()) {
    this.router.navigate(['/']);
    }
    else{
      this.orderItemService.getOrderItemsById(this.authService.loggedInUser.id).subscribe((data: OrderItem[]) => {
        // Process the received data from the backend
        console.log(data);
        this.orderItems = data;
      });
    }
  }

  // else{
  //   console.log(this.authService.loggedInUser.id);
  //   this.orderItemService.getOrderItemsById(this.authService.loggedInUser.id).subscribe((data: OrderItem[]) => {
  //     // Process the received data from the backend
  //     console.log(data);
  //     this.orderItems = data;
  //   });

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

  

  // isAnyoneLoggedin(): boolean {
  //   return this.authService.isAnyoneLoggedin();
  // }
}
