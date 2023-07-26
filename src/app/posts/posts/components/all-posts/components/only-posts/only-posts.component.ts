import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { IAllPosts } from 'src/app/shared/interfaces/i-all-posts';
import { ICountry } from 'src/app/shared/interfaces/i-country';
import { ITownship } from 'src/app/shared/interfaces/i-township';
import { CountryService } from 'src/app/shared/services/country/country.service';
import { PostsService } from 'src/app/shared/services/posts/posts.service';
import { TownshipService } from 'src/app/shared/services/township/township.service';


@Component({
  selector: 'app-only-posts',
  templateUrl: './only-posts.component.html',
  styleUrls: ['./only-posts.component.css']
})
export class OnlyPostsComponent implements OnInit{
  //Podaci
  myPosts: IAllPosts;
  myCountries: ICountry[];
  townships : any;
  numIterations: number;
  startIndex: number = 1;
  nowPage: number;
  defaultPerPage=12;
  defaultPage=1;


  //Za Filtriranje iz htmla
  public filterModel = {
    title: '',
    categoryDimension: '',
    townships: [] as any[],
    countryId: "",
    dateFrom: '',
    dateTo: '',
    perPage: 5,
    Page :1 
  };

  public apiUrl : string;
  
  constructor(public posts: PostsService,
              public countries: CountryService,
              private townshipService : TownshipService,
              private renderer: Renderer2,
              private elementRef : ElementRef,
              private toastr : ToastrService) { 
      this.apiUrl = CONFIGURATION.WITHOUTAPIURL;
      this.townships = null;
   }
  

  //Opstine Select Lista
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  updateOption(option: any) {
    option.checked = !option.checked;
  }

  @HostListener('document:click', ['$event'])
  
  onClick(event: any) {
    if (!event.target.closest('.dropdown')) {
      this.showDropdown = false;
    }
  }
  closeDropdown() {
    this.showDropdown = false;
  }

  onCountryChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue == "0") {
      this.townships=null;
      this.filterModel.countryId="";
      this.filterModel.townships=[];
      return;
    }

    this.filterModel.countryId = selectedValue;

      this.townshipService.getOne(selectedValue).subscribe({
        next: responses =>{
          this.townships = responses;
         },
        error: xhr =>{
          console.log(xhr);
        }
      })
    }

    

  //Ucitavanje stranice
  ngOnInit(): void {
    //Defaultno

      this.filterPosts();


    //Drzave za CheckBoxove
      this.countries.getAll().subscribe({
        next: responses =>{
          this.myCountries = responses;
          console.log(this.myCountries);
        },
        error: xhr =>{
          console.log(xhr);
          //alert("Doslo je do greske!");
        }
      })

  }



  //Filtriraj 
  filterPosts( first:boolean = true) { 

    this.posts.getAllPagination( this.filterModel.title, 
                          this.filterModel.dateFrom , 
                          this.filterModel.dateTo ,
                          this.filterModel.countryId,
                          this.filterModel.townships,
                          this.filterModel.categoryDimension,
                          null, 
                          this.defaultPerPage,
                          first ? 1 : this.nowPage)
            .subscribe({
              next: responses =>{
                
                this.myPosts = responses;
                this.numIterations = this.myPosts.pagesCount;
                this.nowPage = this.myPosts.currentPage;

                let spinner = this.elementRef.nativeElement.querySelector(".loading-spinner");
                this.renderer.removeClass(spinner, 'loading-spinner');
        
              },
              error: xhr =>{

                
              }
            })
            
      this.scrollToTop();

    }
    
  // Koristite Renderer2 za postavljanje pozicije prozora na vrh stranice
  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }
  
  //Promena Strane
  changePage(page: number) {
    this.nowPage = page;
    console.log(page);
    this.filterPosts(false);
  }

  //ChecboxDrzave
  isTownshipSelected(value: string | number): boolean {
    return this.filterModel.townships.includes(value);
  }
  updateTownship(value: string | number) {
    if (this.isTownshipSelected(value)) {
      this.filterModel.townships = this.filterModel.townships.filter(item => item !== value);
    } else {
      this.filterModel.townships.push(value);
    }

    //console.log( this.filterModel.townships);
  }

  //for za paginaciju   
  getRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

}

