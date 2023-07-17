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
  newAuthorName: string = '';

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  addAuthor(): void {
    if (this.newAuthorName.trim() !== '') {
      this.authorService.createAuthor(this.newAuthorName).subscribe(
        (createdAuthor: Author) => {
          console.log('Author created:', createdAuthor);
          this.newAuthorName = ''; // Clear the input field
          this.fetchAuthors(); // Fetch the updated list of authors
        },
        (error) => {
          console.error('Error creating author:', error);
          // Handle error case
        }
      );
    }
  }
}
