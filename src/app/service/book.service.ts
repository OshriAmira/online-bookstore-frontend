import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksPageUrl = "http://localhost:8080/books";
  private books: Book[] = [];
  public booksListUpdated = new Subject<void>();
  private likedBooks: Book[] = [];

  constructor(private http: HttpClient,private router: Router) { 
    const likedBooksJson = localStorage.getItem('likedBooks');
    this.likedBooks = likedBooksJson ? JSON.parse(likedBooksJson) : [];
    this.numLikedItems = this.likedBooks.length;
  }

  numLikedItems: number = 0;

  toggleLiked(book: Book) {
    book.liked = !book.liked;
    if (book.liked) {
      this.numLikedItems++;
      this.addToLikedBooks(book);
    } else {
      this.numLikedItems--;
      this.removeFromLikedBooks(book);
    }
  }

  addToLikedBooks(book: Book) {
    const likedBooksJson = localStorage.getItem('likedBooks');
    const likedBooks: Book[] = likedBooksJson ? JSON.parse(likedBooksJson) : [];
    likedBooks.push(book);
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
    this.likedBooks = likedBooks;
  }

  removeFromLikedBooks(book: Book) {
    const likedBooksJson = localStorage.getItem('likedBooks');
    if (likedBooksJson) {
      const likedBooks: Book[] = JSON.parse(likedBooksJson);
      const updatedLikedBooks = likedBooks.filter(b => b.id !== book.id);
      localStorage.setItem('likedBooks', JSON.stringify(updatedLikedBooks));
      this.likedBooks = updatedLikedBooks;
    }
  }

  getLikedBooks(): Book[] {
    return this.likedBooks;
  }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.booksPageUrl);
  }

  getBookImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  getBookById(bookID: number): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book => 
        book.id== bookID))
    );
  }

  searchBooks(searchTerm: string): Observable<Book[]> {
    const url = `${this.booksPageUrl}?searchTerm=${searchTerm}`; 
    return this.http.get<Book[]>(url);
  }

  searchBooksByTitleOrAuthor(searchTerm: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }

  searchBooksByPriceAndCategory(searchPrice: number, searchCategory: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book => 
        book.price <= searchPrice &&
        book.category.toLowerCase().includes(searchCategory.toLowerCase())
        ))
    );
  }

  searchByPrice(searchPrice: number): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book => 
        book.price <= searchPrice ))
    );
  }

  searchByCategory(searchCategory: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book =>
        book.category.toLowerCase().includes(searchCategory.toLowerCase())
        ))
    );
  }

  getBookCategories(): Observable<string[]> {
    return this.getBooks().pipe(
      map((books) => {
        const categories = new Set<string>();
        books.forEach((book) => {
          categories.add(book.category);
        });
        return Array.from(categories);
      })
    );
  }
  
  searchByAuthor(searchAuthor: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books  => books .filter(book =>
        book.authorName.toLowerCase().includes(searchAuthor.toLowerCase())
        ))
    );
  }

  getBookAuthors(): Observable<string[]> {
    return this.getBooks().pipe(
      map((books) => {
        const authors = new Set<string>();
        books.forEach((book) => {
          authors.add(book.authorName);
        });
        return Array.from(authors);
      })
    );
  }
  
}
