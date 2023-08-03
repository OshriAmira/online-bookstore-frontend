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
  searchTerm: string = '';
  searchPrice: number = 0;
  searchCategory: string = '';
  searchAuthor: string = '';
  currentPage: number = 1;
  booksPerPage: number = 10;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      this.searchAuthor = params['searchAuthor'] || '';
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
      } else if (this.searchAuthor !== '') {
        this.performsearchByAuthor();
      }
    });
    this.totalPages = Math.ceil(this.books.length / this.booksPerPage);
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

  performsearchByAuthor() {
    this.bookService.searchByAuthor(this.searchAuthor)
    .subscribe(books => {
      this.books = books;
    });
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
