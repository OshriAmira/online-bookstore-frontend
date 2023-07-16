import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  books: Book[] = [];
  showBanner: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) {}


  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showBanner = !event.url.includes('/book-details');
      });

    this.route.params.subscribe(params => {
      const bookId = +params['id']; // Assuming the route parameter is named 'id'
      this.loadBookDetails(bookId);
    });
  }

  loadBookDetails(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(book => {
      this.books = book;
    });
  }
}
