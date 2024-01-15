import { Component , OnInit} from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  currentPage: number = 1;
  booksPerPage: number = 10;
  totalPages: number = 0;

  constructor(private bookService: BookService) {}


  ngOnInit(): void {
    // Check if books have already been fetched
    if (this.bookService.books.length === 0) {
      this.bookService.getBooks().subscribe((data: Book[]) => {
        // Process the received data from the backend
        console.log(data);
        this.books = data;
        this.totalPages = Math.ceil(this.books.length / this.booksPerPage);
        this.bookService.books = this.books; // Save books in the service
      });
    } else {
      // Books have already been fetched, use the cached books
      this.books = this.bookService.books;
      this.totalPages = Math.ceil(this.books.length / this.booksPerPage);
    }
  }

  logDecodedImages(): void {
    this.books.forEach((book: Book) => {
      console.log('Book Image:', book.image);
      console.log('Decoded Image:', this.decodeBase64(book.image));
    });
  }
  

  decodeBase64(encodedString: string | null): string {
    if (encodedString) {
      return atob(encodedString);
    }
    return ''; // or any default value you prefer
  }

  getPagedBooks(): Book[] {
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    const endIndex = startIndex + this.booksPerPage;
    return this.books.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  
  
  

  
  

}
