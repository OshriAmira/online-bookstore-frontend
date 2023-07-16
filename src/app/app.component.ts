import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BookService } from './service/book.service';
import { Book } from './model/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online bookstor';
  numLikedItems: number =0;
  likedBooks: Book[] = [];
  showBanner: boolean = true;
  showFavorites: boolean = false;

  constructor(private router: Router, private bookService: BookService) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showBanner = !event.url.includes('/book-details');
  });

 }
}


