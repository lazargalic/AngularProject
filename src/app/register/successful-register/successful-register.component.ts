import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuccessfullRegService } from 'src/app/shared/services/register/successfull-reg.service';

@Component({
  selector: 'app-successful-register',
  templateUrl: './successful-register.component.html',
  styleUrls: ['./successful-register.component.css']
})
export class SuccessfulRegisterComponent implements OnInit {

  guid: string;
  successful : boolean;

  constructor(private route: ActivatedRoute, private verifyService: SuccessfullRegService, private toastr : ToastrService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      this.guid = params.get("guid"); 

      //alert(this.guid);

      this.verifyService.getGuid(this.guid).subscribe({
        next: response =>{
            this.successful= true;
            this.toastr.success("Aktivirali ste nalog!", 'Uspeh');
        },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;

          this.successful= false;
          this.toastr.error(errMessageToDisplay, 'Greška');
        }
      });

    })
  }

  
}
