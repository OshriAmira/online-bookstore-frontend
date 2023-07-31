import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { OrderItemService } from '../service/order-item.service';
import { OrderItem } from '../model/orderItem';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';
import { DatePipe } from '@angular/common'; 
import { ContactFormService } from '../service/contact-form.service';
import { ContactForm } from '../model/contactForm';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})

export class DashboardComponent {

  username = '';
  userId = 0;
  totalPrice = 0;
  // orderItems: OrderItem[] = [];
  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  isMyOrdersVisible: boolean = false;
  isShowMyBooksVisible: boolean = false;
  isShowPersonalInfo: boolean = false;
  isShowOrderDetails: boolean = false;
  isMessagesVisible: boolean = false;
  selectedStatus: string = '';
  uniqueStatuses: string[] = [];
  messageStatus: string = '';
  uniqueMessageStatuses: string[] = [];
  contactMessages: ContactForm[] = [];
  
  constructor(public authService: AuthService, private router: Router,
              private orderItemService: OrderItemService, private orderService: OrderService,
              private contactFormService: ContactFormService
    ) {}

  ngOnInit() {
    //this.fetchOrderItem();
    //console.log("fetchOrderItem -" + this.fetchOrderItem());
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.authService.loggedInUser = JSON.parse(loggedInUser);
    }
    if (!this.authService.isAnyoneLoggedin()) {
      this.router.navigate(['/']);
    }
    else{
    }
  }

  applyStatusFilter() {
    if (this.selectedStatus === '') {
      // If no status is selected, show all orders
      this.orderService.getOrderByUserId(this.authService.loggedInUser.id).subscribe((data: Order[]) => {
        this.orders = data;
      });
    } else {
      // If a status is selected, filter the orders based on the selected status
      this.orderService.getOrdersByStatus(this.authService.loggedInUser.id, this.selectedStatus).subscribe((data: Order[]) => {
        this.orders = data;
      });
    }
  }

  showMyOrders() : void {
    this.isMyOrdersVisible = !this.isMyOrdersVisible;
    this.isShowMyBooksVisible = false;
    this.isShowPersonalInfo = false;
    this.isShowOrderDetails = false;
    this.isMessagesVisible = false;

    this.orderService.getOrderByUserId(this.authService.loggedInUser.id).subscribe((data: Order[]) => {
      this.orders = data;
      this.uniqueStatuses = Array.from(new Set(this.orders.map(order => order.status)));
    });
  }

  moreDetails(orderId: number, totalPrice: number){
    this.isMyOrdersVisible = false;
    this.isShowOrderDetails = true;
    this.orderItemService.getOrderItemsById(orderId).subscribe((data: OrderItem[]) => {
      this.orderItems = data;
      this.totalPrice = totalPrice;
    });

  }

  TotalPrice(): string {
    return this.totalPrice.toFixed(2); 
  }

  calculateTotalPrice(): string {  //Not currently in use
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.quantity * orderItem.price;
    }
    return total.toFixed(2); 
  }


  showPersonalInfo() {
    this.isMyOrdersVisible = false;
    this.isShowOrderDetails = false;
    this.isShowMyBooksVisible = false;
    this.isShowPersonalInfo = !this.isShowPersonalInfo;
    this.isMessagesVisible = false;
  }



  // Function to show My Books
  showMyBooks() {
    this.isMyOrdersVisible = false;
    this.isShowOrderDetails = false;
    this.isShowMyBooksVisible = !this.isShowMyBooksVisible;
    this.isShowPersonalInfo = false;
    this.isMessagesVisible = false;
  }

  getContactMessages() {
    this.isMyOrdersVisible = false;
    this.isShowOrderDetails = false;
    this.isShowMyBooksVisible = false;
    this.isShowPersonalInfo = false;
    this.isMessagesVisible = !this.isMessagesVisible;
    this.contactFormService.getContactForms().subscribe((data: ContactForm[]) => {
      this.contactMessages = data;
    });
  }

  getUserName(): string {
    // Check if the user is logged in and return the full name if available
    if (this.authService.isAnyoneLoggedin()) {
      const user = this.authService.loggedInUser;
      return user.firstName + ' ' + user.lastName;
    }
    return '';
  }


  applyMessagesFilter() {
    if (this.messageStatus === '') {
      // If no status is selected, show all Messages
      this.contactFormService.getContactForms().subscribe((data: ContactForm[]) => {
        this.contactMessages = data;
      });
    } else {
      // If a status is selected, filter the Messages based on the selected status
      this.contactFormService.getContactFormsByStatus(this.messageStatus).subscribe((data: ContactForm[]) => {
        this.contactMessages = data;
      });
    }
  }

  updateStatus(messageId: number) {
    // Find the message in the contactMessages array based on its messageId
    const messageToUpdate = this.contactMessages.find(message => message.id === messageId);
    
    if (messageToUpdate) {
      // Update the status of the message to 'handled'
      messageToUpdate.status = 'handled';
    }
  }

  logout(): void {
    // Set anyoneLoggedin to false
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
