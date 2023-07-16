import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  books: Book[] = [];
  // searchResults: Book[] = [];
  searchTerm: string = '';
  searchPrice: number = 0;
  searchCategory: string = '';

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      this.searchPrice = +params['searchPrice'] || 0;
      this.searchCategory = params['searchCategory'] || '';
      if (this.searchTerm !== '') {
        this.performSearch();
      } else if ((this.searchPrice != 0) && (this.searchCategory !== '')) {
        this.performAdvancedSearch();
      } else if (this.searchPrice != 0) {
        this.performsearchByPrice();
      } else if (this.searchCategory !== '') {
        this.performsearchByCategory();
      }
    });
  }

  performSearch() {
    this.bookService.searchBooksByTitleOrAuthor(this.searchTerm).subscribe(books => {
      this.books = books;
    });
  }

  performAdvancedSearch() {
    this.bookService.searchBooksByPriceAndCategory(this.searchPrice, this.searchCategory)
    .subscribe(books => {
      this.books = books;
    });
  }

  performsearchByPrice() {
    this.bookService.searchByPrice(this.searchPrice)
    .subscribe(books => {
      this.books = books;
    });
  }

  performsearchByCategory() {
    this.bookService.searchByCategory(this.searchCategory)
    .subscribe(books => {
      this.books = books;
    });
  }


}
