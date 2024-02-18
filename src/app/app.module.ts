import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoleComponent } from './role/role.component';
import { RoleService } from './service/role.service';
import { UserService } from './service/user.service';
import { LoginComponent } from './bookstoreComponent/navigation-bar/login/login.component';
import { AuthInterceptor } from './model/auth.interceptor';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { CartItemComponent } from './bookstoreComponent/navigation-bar/cart-item/cart-item.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavigationBarComponent } from './bookstoreComponent/navigation-bar/navigation-bar.component';
import { BottomBarComponent } from './bookstoreComponent/bottom-bar/bottom-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component'; 
import { AboutUsComponent } from './bookstoreComponent/bottom-bar/about-us/about-us.component';
import { SearchComponent } from './bookstoreComponent/search/search.component';
import { ContactUsComponent } from './bookstoreComponent/bottom-bar/contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BookCarouselComponent } from './bookstoreComponent/book-carousel/book-carousel.component';
import { BannerComponent } from './bookstoreComponent/banner/banner.component';
import { FavoritesComponent } from './bookstoreComponent/navigation-bar/favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LikedBooksService } from './service/liked-books.service';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent,
    LoginComponent,
    BookComponent,
    AuthorComponent,
    CartItemComponent,
    OrderItemComponent,
    ShoppingCartComponent,
    NavigationBarComponent,
    BottomBarComponent,
    HomePageComponent,
    AboutUsComponent,
    SearchComponent,
    ContactUsComponent,
    BookCarouselComponent,
    BannerComponent,
    FavoritesComponent,
    SearchResultsComponent,
    BookDetailsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ],
  providers: [
    RoleService,
    UserService,
    LikedBooksService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
