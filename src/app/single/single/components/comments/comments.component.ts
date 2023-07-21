import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPosts } from 'src/app/shared/interfaces/i-posts';
import { JwtHandlerComponent } from 'src/app/shared/middlewares/jwt-handler/jwt-handler.component';
import { AddCommentService } from 'src/app/shared/services/add-comment/add-comment.service';
import { SingleService } from 'src/app/shared/services/single/single.service';
import { DeleteCommentDialogComponent } from 'src/app/single/delete-comment-dialog/delete-comment-dialog.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  
  @Input() myPost: IPosts;
  numberComment : number =0 ;
  replyForm: FormGroup;
  replyForm2: FormGroup;
  fromUrl : any;

  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public loggedUserId :any;
  @Output() customEvent = new EventEmitter<any>();
 

  constructor(private elementRef: ElementRef, 
              private renderer: Renderer2, 
              private addCommentService : AddCommentService,
              private toastr: ToastrService,
              private singleService: SingleService,
              private route : ActivatedRoute,
              private router: Router,
              private jwtHandler: JwtHandlerComponent,
              private dialog: MatDialog
              ){

    this.replyForm = new FormGroup({
      replyContent: new FormControl('', Validators.required)
    });

    this.replyForm2 = new FormGroup({
      replyContent: new FormControl('', Validators.required)
    });

    this.isLoggedIn= this.jwtHandler.IsValidToken();
    this.isAdmin = this.jwtHandler.IsUserAdmin();

    var user= this.jwtHandler.GetUser();

    if(user){
      this.loggedUserId=user.UserId;
    }
    else {
      this.loggedUserId=0;
    }

  }


  showReplyComment(idComment: number) : void {
    const element = this.elementRef.nativeElement.querySelector('#reply-' + idComment);
    this.renderer.addClass(element, 'show-el');

    const element2 = this.elementRef.nativeElement.querySelector('#ico-close-' + idComment);
    this.renderer.addClass(element2, 'show-el');

    const element3 = this.elementRef.nativeElement.querySelector('#ico-replay-' + idComment);
    this.renderer.addClass(element3, 'hide-el');
    
    const element4 = this.elementRef.nativeElement.querySelector('#ico-delete-' + idComment);
    this.renderer.addClass(element4, 'hide-el');

  }

  hideReplyComment(idComment: number) : void {
    const element = this.elementRef.nativeElement.querySelector('#reply-' + idComment);
    this.renderer.removeClass(element, 'show-el');

    const element2 = this.elementRef.nativeElement.querySelector('#ico-close-' + idComment);
    this.renderer.removeClass(element2, 'show-el');

    const element3 = this.elementRef.nativeElement.querySelector('#ico-replay-' + idComment);
    this.renderer.removeClass(element3, 'hide-el');

    const element4 = this.elementRef.nativeElement.querySelector('#ico-delete-' + idComment);
    this.renderer.removeClass(element4, 'hide-el');
  }


  ngOnInit(): void {
    
     this.route.paramMap.subscribe(params => {
      this.fromUrl = params.get("id"); 
 
    })    


    setTimeout(()=>{

      for(let comment of this.myPost.comments){
        this.numberComment ++;

        for(let c in comment.childCommentts){
          this.numberComment++;
        }
      }
      
  }, 1000)
  
  }


  postReply(form: FormGroup, parrentCommentId: string | number, articleId :string | number) {

    console.log(form);

    if (form.valid) {
 

      const replyContent = form.value.replyContent;

      var dataToSend = {
        "content": replyContent,
        "parrentCommentId": parrentCommentId,  
        "articleId": articleId,
        "categoryCommentId": 1,
        "categoryDimensionId": 1, 
        "stickerId": 0  
      }

      let token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      this.addCommentService.create(dataToSend, headers).subscribe({
        next: response =>{

          this.replyForm.reset();
          this.toastr.success('Uspešno ste se dodali komentar!', 'Uspeh');

          
          //window.location.replace('/single/' + this.fromUrl);
          this.sendEvent();

        },
        error: xhr =>{
          var errMessageToDisplay;
          if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
          if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
          
          this.toastr.error(errMessageToDisplay, 'Greška');

        }

      });


      form.reset();


    } else {
      alert("not valid");

      form.markAllAsTouched();
    }
  }
 


  sendEvent() {
    this.customEvent.emit({ message: 'Event' });
  }



  scrollTop() : void {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    this.router.navigate(['/login']);
  }


  openDeleteDialog(user: any): void {
    const dialogRef = this.dialog.open(DeleteCommentDialogComponent, {
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.sendEvent();

    });
  }


}
