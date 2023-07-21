import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../shared/services/register/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm: FormGroup;

  constructor(private registerService : RegisterService, private router : Router, private toastr: ToastrService) { }

  ngOnInit() {  //@"\b[A-Z][a-zA-Z]*\b"  // @"^(?=.*[a-z])(?=.*[A-Z0-9#?!@$%^&*-]).+$";
    this.registrationForm = new FormGroup({
      firstName: new FormControl ('', [Validators.required, Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/)    ]),
      lastName: new FormControl ('', [Validators.required, Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/) ]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z0-9#?!@$%^&*-]).{8,}$/)]),
      identityNumber: new FormControl ('', [Validators.maxLength(20), Validators.minLength(6)]),
      phoneNumber: new FormControl ('', [Validators.maxLength(15), Validators.minLength(6)])
    });
  }

  submitForm() {
    if(this.registrationForm.valid){
      let firstName = this.registrationForm.get('firstName')?.value;
      let lastName = this.registrationForm.get('lastName')?.value;
      let email = this.registrationForm.get('email')?.value;
      let password = this.registrationForm.get('password')?.value;
      let identityNumber = this.registrationForm.get('identityNumber')?.value;
      let phoneNumber = this.registrationForm.get('phoneNumber')?.value;

      var dataToSend =  {
        firstName : firstName,
        lastName: lastName,
        email : email,
        password : password,
        identityNumber:identityNumber,
        phoneNumber: phoneNumber
      }

      this.registerService.create(dataToSend).subscribe({
        next: response =>{

          this.registrationForm.reset();
         
          this.toastr.success('Uspešno ste se registrovali!', 'Uspeh');
          this.router.navigate(["/login"]);

        },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
          this.toastr.error(errMessageToDisplay, 'Greška');
         // console.log(errMessageToDisplay);

        }
      });
 
      
    }
    //console.log(dataToSend);
    
  }
}