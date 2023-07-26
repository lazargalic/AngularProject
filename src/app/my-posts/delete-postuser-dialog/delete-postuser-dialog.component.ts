import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeletePostService } from 'src/app/shared/services/posts/delete-post.service';


@Component({
  selector: 'app-delete-postuser-dialog',
  templateUrl: './delete-postuser-dialog.component.html',
  styleUrls: ['./delete-postuser-dialog.component.css']
})
export class DeletePostuserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePostuserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deletePostService : DeletePostService,
    private router : Router, 
    private toastr: ToastrService
  ) {}

  deletePost(id : number | string): boolean {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
 
    var dataToSend = {
      "idArticle": id
    }
 

    this.deletePostService.delete(dataToSend, headers).subscribe({
      next: response =>{

        this.toastr.success('Uspešno ste obrisali objavu!', 'Uspeh');
        this.cancelDialog();
        return true;
      },
      error: xhr =>{
        var errMessageToDisplay;
        if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
        if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
        
        this.toastr.error(errMessageToDisplay, 'Greška');
        console.log(errMessageToDisplay);
        
      }
    });

    return false;
  }

  cancelDialog(): void {
    this.dialogRef.close('deleted');
  }
}