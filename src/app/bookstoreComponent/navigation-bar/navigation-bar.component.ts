import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  @Input() title: string = 'Bookstore';
  @Input() numLikedItems: number =0;
  books: Book[] = [];
  likedBooks: Book[] = [];
  dropdownOpen = false;
  category: string ='';
  categories: string[] = [];
  searchCategory: string = '';

  constructor(private router: Router, public bookService: BookService,
              public authService: AuthService
    ) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.bookService.getBookCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  performSearchByCategory(searchCategory: string) {
    this.bookService.searchByCategory(searchCategory)
    .subscribe(books => {
      this.books = books;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleLiked(book: Book) {
    this.bookService.toggleLiked(book);
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.dropdownOpen = false; // Close the dropdown after navigating
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu') && !target.closest('.nav-link')) {
      this.dropdownOpen = false; // Close the dropdown if clicked outside
    }
  }
}

