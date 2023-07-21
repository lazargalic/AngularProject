import { Component, OnInit } from '@angular/core';
import { IFooter } from 'src/app/shared/interfaces/i-footer';
import { FooterService } from 'src/app/shared/services/footer/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  myfooter : IFooter[];
  constructor(private footerService : FooterService)  { }
  
  ngOnInit(): void {
    this.footerService.getAll().subscribe({
      next: respones =>{
        this.myfooter = respones;
        console.log(this.myfooter);
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske!");
      }
    })   
  }

}
