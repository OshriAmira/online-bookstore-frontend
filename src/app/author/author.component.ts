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
  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data: Author[]) => {
        // Process the received data from the backend
        console.log(data);
        this.authors = data;
      });
  }

}
