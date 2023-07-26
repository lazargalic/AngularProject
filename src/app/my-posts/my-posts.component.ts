import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { IAllPosts } from '../shared/interfaces/i-all-posts';
import { ICountry } from '../shared/interfaces/i-country';
import { CONFIGURATION } from '../constant/configuration';
import { MyPostsService } from '../shared/services/my-posts/my-posts.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { DeletePostuserDialogComponent } from './delete-postuser-dialog/delete-postuser-dialog.component';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit{

  myPosts: IAllPosts;
  myCountries: ICountry[];
  townships : any;
  numIterations: number;
  startIndex: number = 1;
  nowPage: number;
  defaultPerPage=3;
  defaultPage=1;


    //Za Filtriranje iz htmla
    public filterModel = {
      title: '',
      categoryDimension: '',
      townships: [] as any[],
      countryId: "",
      dateFrom: '',
      dateTo: '',
      perPage: 2,
      Page :1 
    };

    public apiUrl : string;
  
    constructor(public posts: MyPostsService,
               // public countries: CountryService,
              //  private townshipService : TownshipService,
                private renderer: Renderer2,
                private elementRef : ElementRef,
                private toastr : ToastrService,
                private router : Router,
                private dialog: MatDialog) { 
        this.apiUrl = CONFIGURATION.WITHOUTAPIURL;
     }

  ngOnInit(): void {
    this.filterPosts();

 
  }


  
     //Filtriraj 
  filterPosts( first:boolean = true) { 

    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.posts.getAllPagination( this.filterModel.title, 
                          this.filterModel.dateFrom , 
                          this.filterModel.dateTo ,
                          this.filterModel.countryId,
                          this.filterModel.townships,
                          this.filterModel.categoryDimension,
                          headers, 
                          this.defaultPerPage,
                          first ? 1 : this.nowPage)
            .subscribe({
              next: responses =>{
                
                this.myPosts = responses;
                this.numIterations = this.myPosts.pagesCount;
                this.nowPage = this.myPosts.currentPage;

                var spinner = this.elementRef.nativeElement.querySelector(".loading-spinner");
                this.renderer.removeClass(spinner, 'loading-spinner');
        
              },
              error: xhr =>{
                var errMessageToDisplay;
                if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
                if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
 
                this.toastr.error(errMessageToDisplay, 'Greška');

                this.router.navigate(['/login']);

              }
            })

            this.scrollToTop();

 
    }


    scrollToTop() {
      this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    }



  //for za paginaciju   
  getRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }


  //Promena Strane
  changePage(page: number) {
    this.nowPage = page;
    console.log(page);
    this.filterPosts(false);
  }



  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.filterPosts();
    });
  }

  openDeleteDialog(post: any): void {
    const dialogRef = this.dialog.open(DeletePostuserDialogComponent, {
      data: post
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.filterPosts();
          
    });
  }  
  

}
