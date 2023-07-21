import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteCommentService } from 'src/app/shared/services/delete-comment/delete-comment.service';
import { DeletePostService } from 'src/app/shared/services/posts/delete-post.service';

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.css']
})
export class DeleteCommentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deleteCommentService : DeleteCommentService,
    private router : Router, 
    private toastr: ToastrService
  ) {}

  deleteComment(id : number | string): boolean {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
 

    this.deleteCommentService.deleteWithUrl(id, headers).subscribe({
      next: response =>{

        this.toastr.success('Uspešno ste obrisali komentar!', 'Uspeh');
        this.cancelDialog();
        return true;
      },
      error: xhr =>{
        var errMessageToDisplay;
        if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
        if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
        
        this.toastr.error(errMessageToDisplay, 'Greška');
        //console.log(errMessageToDisplay);
        //console.log(xhr);
      }
    });

    return false;
  }

  cancelDialog(): void {
    this.dialogRef.close('deleted');
  }

  
}
