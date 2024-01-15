import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root',
})
export class LikedBooksService {
  private likedBooks: Map<string, Book[]> = new Map(); // Map user ID to liked books array

  getLikedBooks(userId: string): Book[] {
    return this.likedBooks.get(userId) || [];
  }

  toggleLiked(userId: string, book: Book): void {
    const likedBooks = this.likedBooks.get(userId) || [];
    const index = likedBooks.findIndex((b) => b.id === book.id);

    if (index !== -1) {
      likedBooks.splice(index, 1);
    } else {
      likedBooks.push(book);
    }

    this.likedBooks.set(userId, likedBooks);
  }

  isBookLiked(userId: string, book: Book): boolean {
    const likedBooks = this.likedBooks.get(userId) || [];
    return likedBooks.some((b) => b.id === book.id);
  }
}
