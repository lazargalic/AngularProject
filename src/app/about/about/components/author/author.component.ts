import { Component, Input } from '@angular/core';
import { IAuthor } from 'src/app/shared/interfaces/i-author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  @Input() myPageToPut : IAuthor[];

}
