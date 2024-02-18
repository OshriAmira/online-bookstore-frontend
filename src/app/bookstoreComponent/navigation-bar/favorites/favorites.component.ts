import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { Book } from '../../../model/book';
import { ShoppingCart } from '../../../model/shoppingCart';
import { CartItem } from '../../../model/cartItem';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{
  books: Book[] = [];
  likedBooks: Book[] = []; 
  cartItems: CartItem[] = [];
  cartItem: CartItem = new CartItem(); 
  hoveredBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.showLikedBooks();
  }


  showLikedBooks() {
    this.books = this.bookService.getLikedBooks();
  }

  getCarouselBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books.filter(book => book.liked);
    });
  }

  toggleLiked(book: Book) {
    this.bookService.toggleLiked(book);
    setTimeout(() => {
      this.showLikedBooks();
    }, 65);    
  }
  toggleAdded(cartItem: CartItem): void {
    cartItem.added = !cartItem.added;
  }

  setHoveredBook(book: Book | null) {
    this.hoveredBook = book;
  }

  isBookHovered(book: Book): boolean {
    return this.hoveredBook === book;
  }
  
}

