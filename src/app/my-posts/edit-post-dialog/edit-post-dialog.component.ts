import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { ICountry } from 'src/app/shared/interfaces/i-country';
import { CountryService } from 'src/app/shared/services/country/country.service';
import { EditPostService } from 'src/app/shared/services/my-posts/edit-post.service';
import { TownshipService } from 'src/app/shared/services/township/township.service';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent implements OnInit {
  
  public editPostFormGroup: FormGroup;
  countries : ICountry[];
  townships : any;
  selectedImageFile : any;
  selectedCountry : any ;
  apiUrl : any;

  constructor( public dialogRef: MatDialogRef<EditPostDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private countriesService : CountryService,
              private townshipService: TownshipService,
              private editPostService: EditPostService,
              private toastr: ToastrService,
              private renderer : Renderer2
  ) {

    this.selectedCountry= this.data.township.idCountry;
    this.apiUrl = CONFIGURATION.WITHOUTAPIURL;

    this.countriesService.getAll().subscribe({
      next: responses =>{
        this.countries = responses;
      },
      error: xhr =>{
        console.log(xhr);
        //alert("Doslo je do greske!");
      }
    })



    this.townshipService.getOne(this.selectedCountry).subscribe({
      next: responses =>{
        this.townships = responses;
        console.log(this.townships);
      },
      error: xhr =>{
        console.log(xhr);
      }
    }) 


    this.createForm();

  }
 
  ngOnInit(): void {   }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    if(this.editPostFormGroup.valid) {

      var formData = new FormData();

      let token = localStorage.getItem("token");
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      let nameArticle = this.editPostFormGroup.get('nameArticle')?.value;
      let mainPicturePath = this.editPostFormGroup.get('mainPicturePath')?.value;
      let description = this.editPostFormGroup.get('description')?.value;
      let additionalDescription = this.editPostFormGroup.get('additionalDescription')?.value;
      let mainContent = this.editPostFormGroup.get('mainContent')?.value;
      let quote = this.editPostFormGroup.get('quote')?.value;
      let beggin = this.editPostFormGroup.get('beggin')?.value;
      let end = this.editPostFormGroup.get('end')?.value;
      let categoryDimensionId = this.data.categoryDimensionId;
      let categoryDesignArticleId= '1';
      let townshipId = this.editPostFormGroup.get('townshipId')?.value;


      if(this.selectedImageFile)  formData.append('MainPicture', this.selectedImageFile,  this.selectedImageFile.name );
      else   formData.append('MainPicture', null );

      formData.append('id', this.data.id);
      formData.append('NameArticle', nameArticle);
      formData.append('Description', description);
      formData.append('AdditionalDescription', additionalDescription);
      formData.append('MainContent', mainContent);
      formData.append('AdditionalDescription', additionalDescription);
      formData.append('Quote', quote);
      formData.append('Beggin', beggin);
      formData.append('End', end);
      formData.append('CategoryDimensionId', categoryDimensionId);
      formData.append('CategoryDesignArticleId', categoryDesignArticleId);
      formData.append('TownshipId', townshipId);


      this.editPostService.updatePatchFormData(formData, headers)
              .subscribe({
                next: responses =>{
  
                  this.toastr.success("Uspešno ste izmenili objavu.", 'Uspeh');
                  this.onCancel();

                },
                error: xhr =>{
                  var errMessageToDisplay;
                  if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
                  if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
  
                  this.toastr.error(errMessageToDisplay, 'Greška');

                }
              })

              this.scrollToTop();
      }

    }


    scrollToTop() {
      this.renderer.setProperty(document.documentElement, 'scrollTop', 20);
    }


createForm() {

  console.log(this.data);

  this.editPostFormGroup = new FormGroup({
    nameArticle: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
    mainPicturePath: new FormControl('', []),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(745)]),
    additionalDescription: new FormControl('', Validators.maxLength(445)),
    mainContent: new FormControl('', Validators.maxLength(3000)),
    quote: new FormControl('', Validators.maxLength(385)),
    beggin: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    categoryDimensionId: new FormControl('', []),
    countryId: new FormControl(this.selectedCountry, []),
    townshipId: new FormControl(this.data.township.id, []),
  });

  this.data.beggin = this.convertToDateString(this.data.beggin);
  this.data.end = this.convertToDateString(this.data.end);
}



  onCountryChange(event: Event) {
    this.selectedCountry = (event.target as HTMLSelectElement).value;
    if(this.selectedCountry==""){
      this.townships=[];
    }
    
    this.editPostFormGroup.get('townshipId')?.reset('');
      this.townshipService.getOne(this.selectedCountry).subscribe({
        next: responses =>{
          this.townships = responses;
        },
        error: xhr =>{
          console.log(xhr);
        }
      })

  }

handleMainPictureChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    this.selectedImageFile = files[0];
    this.editPostFormGroup.get('mainPicturePath').setValue(this.selectedImageFile);
  }
}

 

private convertToDateString(dateTimeString: string): string {
  // Pretpostavljamo da vam je potrebna konverzija u "YYYY-MM-DD" format
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const day = ('0' + dateTime.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}



}
