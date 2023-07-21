import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUsers } from 'src/app/shared/interfaces/i-users';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
   
  displayedColumns: string[] = ['id', 'email', 'name', 'role', 'phoneNumber', 'created', 'updated', 'deleted', 'edit' ];

  myUsers: IUsers[];
  dataSource : any;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  
  constructor(private usersService: UsersService, private dialog: MatDialog, private toastr : ToastrService, private elementRef: ElementRef) {  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    
    this.searchAndGetUsers();
  }
 

  searchAndGetUsers() : void {
    var keyword = this.elementRef.nativeElement.querySelector('#keywordUsers').value;
    //alert(keyword);

      this.usersService.getAllRegUsersFilter(keyword, this.headers)
      .subscribe({
        next: responses =>{
          this.myUsers = responses;
          this.dataSource= new MatTableDataSource<any>(this.myUsers);
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

   openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.searchAndGetUsers();
    });
  }



}
