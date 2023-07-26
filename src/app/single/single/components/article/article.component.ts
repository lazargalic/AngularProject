import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { IPosts } from 'src/app/shared/interfaces/i-posts';
import { JwtHandlerComponent } from 'src/app/shared/middlewares/jwt-handler/jwt-handler.component';
import { ReactService } from 'src/app/shared/services/emotions/react.service';
import { UnreactService } from 'src/app/shared/services/emotions/unreact.service';
import { IsReactedService } from 'src/app/shared/services/is-reacted/is-reacted.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  @Input() myPost: IPosts;
  apiUrl : string;
  singleId : any;
  isLoggedIn: any;

  existUserReaction : any = null;
  @Output() customEvent = new EventEmitter<any>();
  
  constructor(private isReactedService : IsReactedService, 
              private jwtService : JwtHandlerComponent, 
              private route: ActivatedRoute,
              private toastr : ToastrService,
              private reactService : ReactService,
              private unreactService : UnreactService){
  }

  ngOnInit(): void {

   this.isLoggedIn = this.jwtService.IsValidToken();

    this.apiUrl = CONFIGURATION.WITHOUTAPIURL;

    this.route.paramMap.subscribe(params => {
      this.singleId = params.get("id"); 
    })

    this.loadIsReacted();
  }

  loadIsReacted() : void{


    let isValidToken = this.jwtService.IsValidToken();


    if(isValidToken) {

      let token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      this.isReactedService.getOne(this.singleId, headers).subscribe({
        next: response =>{
 
        this.existUserReaction= response.idEmotion;
        //alert(this.existUserReaction);
         
        },

        error: xhr =>{

          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
          this.toastr.error(errMessageToDisplay, 'Greška');

          
        }
      });
    }
  }

  unreact(idEmotion: any): void {
    var dataToSend = {
        "articleId": this.singleId,
        "emotionId": idEmotion
      };

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
 

    this.unreactService.delete(dataToSend, headers).subscribe({
      next: response =>{

        this.toastr.info('Uspešno ste ponistili reakciju!', 'Uspeh');
        
        this.sendEvent();
        this.loadIsReacted();

      },
      error: xhr =>{
        var errMessageToDisplay;
        if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
        if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
        
        this.toastr.error(errMessageToDisplay, 'Greška');
 
      }
    });
  }


  react(idEmotion : any) {
    var dataToSend = {
      "articleId": this.singleId,
      "emotionId": idEmotion
    };

  let token = localStorage.getItem('token');
  let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);


  this.reactService.create(dataToSend, headers).subscribe({
    next: response =>{

      this.toastr.info('Uspešno ste ostavili reakciju!', 'Uspeh');
      
      this.sendEvent();
      this.loadIsReacted();

    },
    error: xhr =>{
      var errMessageToDisplay;
      if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
      if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
      
      this.toastr.error(errMessageToDisplay, 'Greška');

    }
  });
  }

  sendEvent() {
    this.customEvent.emit({ message: 'Event' });
  }

}
