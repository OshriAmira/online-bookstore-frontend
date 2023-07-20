import { Component, OnInit } from '@angular/core';
import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: Author[] = [];
  newAuthorName: String = "";
  AuthorID: number = 0;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  createAuthor(): void {
    
    if (this.newAuthorName.trim() !== '') {
      console.log(this.newAuthorName);
      this.authorService.createAuthor(this.newAuthorName).subscribe();
    }
  }

  deleteAuthor(AuthorID: number): void {
    this.authorService.deleteAuthor(AuthorID).subscribe(
      () => {
        console.log('Author deleted successfully.');
        // Perform any additional actions after successful deletion
      },
      (error) => {
        console.error('Error deleting author:', error);
        // Handle the error appropriately
      }
    );

  }


}
