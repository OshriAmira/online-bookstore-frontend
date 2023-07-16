import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
import { CartItem } from '../model/cartItem';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.scss']
})
export class BookCarouselComponent implements OnInit {
  books: Book[] = [];
  showIcons = false;
  numLikedItems: number = 0;
  cartItems: CartItem[] = [];
  cartItem: CartItem = new CartItem(); 

  constructor(private bookService: BookService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
  
      const likedBooksJson = localStorage.getItem('likedBooks');
      const likedBooks: Book[] = likedBooksJson ? JSON.parse(likedBooksJson) : [];
      likedBooks.forEach(likedBook => {
        const book = this.books.find(b => b && b.id === likedBook?.id);
        if (book) {
          book.liked = true;
        }
      });
  
      this.numLikedItems = likedBooks.length;
    });
  }


  toggleLiked(book: Book) {
    this.bookService.toggleLiked(book);
  }

  toggleAdded(cartItem: CartItem) {
    cartItem.added = !cartItem.added;
  }


}
