import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  books: Book[] = [];
  searchText: string = '';
  showAdvancedSearch: boolean = false;
  price: number = 0;
  category: string = '';
  categories: string[] = [];


  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.fetchCategories();
  }
  
  navigateToSearchResults() {
    this.router.navigate(['/search-results'], { 
      queryParams: { 
        searchTerm: this.searchText,
        searchPrice: this.price,
        searchCategory: this.category
      }
    });
    this.searchText = ''; // Clear the search text after submitting
    this.price = 0;
    this.category = '';
    this.showAdvancedSearch = false;
  }

  fetchCategories() {
    this.bookService.getBooks().subscribe(books => {
      // Extract unique categories from the books
      this.categories = Array.from(new Set(books.map(book => book.category)));
    });
  }

  toggleAdvancedSearch(event: Event) {
    event.preventDefault(); // Prevent the form submission
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
  
  
  

}
