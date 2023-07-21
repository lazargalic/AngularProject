import { Component, OnInit } from '@angular/core';
import { INav } from 'src/app/shared/interfaces/i-nav';
import { NavbarService } from 'src/app/shared/services/navbar/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {

  }
 /* mynav: INav[];
  constructor(private navbarService: NavbarService){

  }

  ngOnInit(): void {
    this.navbarService.getAll().subscribe({
      next: respones =>{
        this.mynav = respones;
        console.log(this.mynav);
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske!");
      }
    })
  }*/

}
