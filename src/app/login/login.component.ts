import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IApplicationUser } from '../shared/interfaces/i-application-user';
import { JwtHandlerComponent } from '../shared/middlewares/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private loginService : LoginService, 
              private router: Router,
              private toastr: ToastrService, 
              private jwtHandler: JwtHandlerComponent,
              private renderer : Renderer2
              ) { }

  ngOnInit() {
 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl ('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z0-9#?!@$%^&*-]).{8,}$/)
        ]
      )
    });

    this.scrollToTop();
  }

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }



  submitForm() {
    if(this.loginForm.valid){

      let email = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;
    
      var dataToSend =  {
        email : email,
        password : password,
      }

      this.loginService.create(dataToSend).subscribe({
        next: (data: any) =>{

          //localStorage.setItem('token', data.token);
          this.jwtHandler.SetToken(data.token);
          

          this.toastr.success("Uspešno ste se ulogovali.", 'Uspeh');
          this.loginForm.reset();
         // this.router.navigate(['/']);
          window.location.replace('/');

        },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
          this.toastr.error(errMessageToDisplay, 'Greška');
          console.log(errMessageToDisplay);
        }
      });

    }


  }
}