import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../model/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsPageUrl = "http://localhost:8080/authors";

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.authorsPageUrl);
  }

  createAuthor(newAuthorName: String): Observable<Author> {
    // const authorData = { name: newAuthorName.name };
    return this.httpClient.post<Author>(this.authorsPageUrl, newAuthorName);
  }

  deleteAuthor(AuthorID: number): Observable<void>{
    const url = `${this.authorsPageUrl}/${AuthorID}`;
    return this.httpClient.delete<void>(url);
  }
}
