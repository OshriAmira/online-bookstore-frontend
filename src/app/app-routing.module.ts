import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthorComponent } from './author/author.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'books', component: BookComponent },
  { path: 'authors', component: AuthorComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'contact', component: ContactUsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'shopping-carts', component: ShoppingCartComponent },
  { path: 'shopping-carts/:id', component: ShoppingCartComponent },
  // { path: 'search-results/:searchTerm', component: SearchResultsComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }