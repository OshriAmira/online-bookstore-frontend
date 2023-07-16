import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../model/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsPageUrl = "http://localhost:8080/authors";

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.authorsPageUrl}`);
  }
}
