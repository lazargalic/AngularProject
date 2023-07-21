import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserService } from 'src/app/shared/services/users/update-user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit{

  userForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editUserServoce : UpdateUserService,
    private router : Router, 
    private toastr: ToastrService
  ) {  }
  
  ngOnInit() {  //@"\b[A-Z][a-zA-Z]*\b"  // @"^(?=.*[a-z])(?=.*[A-Z0-9#?!@$%^&*-]).+$";
    this.userForm = new FormGroup({
      firstName: new FormControl ('', [Validators.required, Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/)    ]),
      lastName: new FormControl ('', [Validators.required, Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/) ]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      identityNumber: new FormControl ('', [Validators.maxLength(20), Validators.minLength(6)]),
      phoneNumber: new FormControl ('', [Validators.maxLength(15), Validators.minLength(6)]),
      roleId: new FormControl(this.data.role.roleId),
      isActive: new FormControl(this.data.isActive),
      idHidden: new FormControl('')
    });
  }


  onCancel(): void {
    this.dialogRef.close('deleted');
  }

  onSave(): void {

    if(this.userForm.valid){
      let id = this.userForm.get('idHidden')?.value;

      let firstName = this.userForm.get('firstName')?.value;
      let lastName = this.userForm.get('lastName')?.value;
      let email = this.userForm.get('email')?.value;
      let role = this.userForm.get('roleId')?.value;
      let isActive = this.userForm.get('isActive')?.value;
      let identityNumber = this.userForm.get('identityNumber')?.value;
      let phoneNumber = this.userForm.get('phoneNumber')?.value;

      var dataToSend =  {
        idUserToUpdate: id,
        firstName : firstName,
        lastName: lastName,
        email : email,
        roleId : role,
        isActive : isActive,
        identityNumber:identityNumber,
        phoneNumber: phoneNumber,
        password: ""
      }

      console.log(dataToSend);

      let token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      
      this.editUserServoce.update(dataToSend, headers).subscribe({
        next: response =>{

          this.userForm.reset();
          this.toastr.success('Uspešno ste izmenili korisnika!', 'Uspeh');

          this.onCancel();
        },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
          this.toastr.error(errMessageToDisplay, 'Greška');
          //console.log(errMessageToDisplay);

        }
      });
 
      
    }


   

  }





}
