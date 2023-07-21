import { Component, Input, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/shared/interfaces/i-author';
import { AuthorService } from 'src/app/shared/services/author/author.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() myPageToPut: IAuthor[];
  constructor(private myPage: AuthorService){

  }

  ngOnInit(): void {
    this.myPage.getAll().subscribe({
      next: respones =>{
        this.myPageToPut = respones;
        console.log(this.myPageToPut);
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske!");
      }
    })
  }

}


/*

export class HomeComponent implements OnInit {  
  premiumApartments: IApartment[];
  constructor(private apartmentServis: ApartmentsService){

  }
  ngOnInit(): void {
    this.apartmentServis.get().subscribe({
      next: respones =>{
        this.premiumApartments = respones;
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske prilikom ucitavanja primum apartmana! Pogledajte konzolu!");
      }
    })
  }

}
*/