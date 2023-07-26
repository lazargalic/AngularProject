import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts/posts.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpHeaders } from '@angular/common/http';
import { IPosts } from 'src/app/shared/interfaces/i-posts';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../../my-posts/edit-post-dialog/edit-post-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletePostDialogComponent } from '../dialogs/delete-post-dialog/delete-post-dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css'],
})
export class AdminPostsComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  
  displayedColumns: string[] = ['position', 'name', 'author', 'total', 'created', 'updated', 'deleted',  /*'update' , */ 'delete' ];
  myPosts: IPosts[];
  defaultPerPage=999999999;
  defaultPage=1;
  dataSource : any;
 
  
  constructor(private postsService: PostsService, private dialog: MatDialog, 
              private toastr : ToastrService, private elementRef: ElementRef,
              private renderer : Renderer2) {  }

  ngOnInit(): void {
    this.searchAndGetPosts();

    this.scrollToTop();
  }
  
    searchAndGetPosts() : void {
      
      var keyword = this.elementRef.nativeElement.querySelector('#keywordPost').value;
      //alert(keyword);

      this.postsService.getAllPagination( keyword , "" , "", "", [] , "", this.headers , this.defaultPerPage , this.defaultPage)
      .subscribe({
        next: responses =>{
          this.myPosts = responses.data;
          this.dataSource= new MatTableDataSource<any>(this.myPosts);
          this.dataSource.paginator = this.paginator;
  
         },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
         // console.log(xhr);
          this.toastr.error(errMessageToDisplay, 'Greška');
         // console.log(errMessageToDisplay);
        }
      })
   }
 
  openDeleteDialog(post: any): void {
    const dialogRef = this.dialog.open(DeletePostDialogComponent, {
      data: post
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.searchAndGetPosts();
          
    });
  }  

  scrollToTop() {
    // Koristite Renderer2 za postavljanje pozicije prozora na vrh stranice
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }


  /*
openEditDialog(post: any): void {
  const dialogRef = this.dialog.open(EditPostDialogComponent, {
    data: post
  });

  dialogRef.afterClosed().subscribe(result => {
    // Obrada rezultata nakon zatvaranja dijaloga
    if (result === 'updated') {
      // Ažurirajte prikaz podataka
    }
  });
}
*/
  

  
}
 