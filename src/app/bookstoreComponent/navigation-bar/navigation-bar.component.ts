import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  @Input() title: string = 'Bookstore';
  @Input() numLikedItems: number =0;
  books: Book[] = [];
  likedBooks: Book[] = [];
  categoriesDropdownOpen = false;
  authorsDropdownOpen = false;
  category: string ='';
  categories: string[] = [];
  searchCategory: string = '';
  author: string ='';
  authors: string[] = [];
  searchAuthor: string = '';

  constructor(private router: Router, public bookService: BookService,
              public authService: AuthService
    ) {
    this.fetchCategories();
    this.fetchAuthors();
  }

  fetchCategories() {
    this.bookService.getBookCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchAuthors() {
    this.bookService.getBookAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  performSearchByCategory(searchCategory: string) {
    this.bookService.searchByCategory(searchCategory)
    .subscribe(books => {
      this.books = books;
    });
  }

  performSearchByAuthor(searchAuthor: string) {
    this.bookService.searchByAuthor(searchAuthor)
    .subscribe(books => {
      this.books = books;
    });
  }

  
  toggleCategoriesDropdown() {
    this.categoriesDropdownOpen = !this.categoriesDropdownOpen;
    this.authorsDropdownOpen = false; // Close the authors dropdown when opening categories
  }

  toggleAuthorsDropdown() {
    this.authorsDropdownOpen = !this.authorsDropdownOpen;
    this.categoriesDropdownOpen = false; // Close the categories dropdown when opening authors
  }

  toggleLiked(book: Book) {
    this.bookService.toggleLiked(book);
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.authorsDropdownOpen = false; // Close the dropdowns after navigating
    this.categoriesDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu') && !target.closest('.nav-link')) {
      this.authorsDropdownOpen = false; // Close the dropdowns after navigating
    this.categoriesDropdownOpen = false;
    }
  }

  getUserName(): string {
    // Check if the user is logged in and return the full name if available
    if (this.authService.isAnyoneLoggedin()) {
      const user = this.authService.loggedInUser;
      return user.firstName + ' ' + user.lastName;
    }
    return '';
  }
}

