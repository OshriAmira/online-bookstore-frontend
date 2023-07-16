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
  constructor(private bookService: BookService) {}


  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      // Process the received data from the backend
      console.log(data);
      this.books = data;
      // this.logDecodedImages();
    });
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
  
  

  
  

}
