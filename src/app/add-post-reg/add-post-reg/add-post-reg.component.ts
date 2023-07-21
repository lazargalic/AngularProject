import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/constant/API';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { ICountry } from 'src/app/shared/interfaces/i-country';
import { ITownship } from 'src/app/shared/interfaces/i-township';
import { AddPostNoregService } from 'src/app/shared/services/add-post-noreg/add-post-noreg.service';
import { AddPostRegService } from 'src/app/shared/services/add-post-noreg/add-post-reg.service';
import { CountryService } from 'src/app/shared/services/country/country.service';
import { TownshipService } from 'src/app/shared/services/township/township.service';
 

@Component({
  selector: 'app-add-post-reg',
  templateUrl: './add-post-reg.component.html',
  styleUrls: ['./add-post-reg.component.css']
})
export class AddPostRegComponent implements OnInit {
  
  public formazadodavanjeForm: FormGroup;
  
  countries : ICountry[];
  townships : any;

  selectedImageFile : any;
 

  constructor(private countryService : CountryService,
              private townshipService : TownshipService,
              private addPostRegService : AddPostRegService,
              private toastr: ToastrService) { 
 
 
                
              }


  ngOnInit() {
    this.createForm();
    this.countryService.getAll()
    .subscribe({
      next: responses =>{
        this.countries = responses;
        console.log(this.countries);
       },
      error: xhr =>{
        console.log(xhr);
      }
    })
 }

 onCountryChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;

  if(selectedValue==""){
    this.townships=[];
  }
  
  this.formazadodavanjeForm.get('townshipId')?.reset('');


    this.townshipService.getOne(selectedValue).subscribe({
      next: responses =>{
        this.townships = responses;
       },
      error: xhr =>{
        console.log(xhr);
      }
    })

}

  createForm() {
    this.formazadodavanjeForm = new FormGroup({
      nameArticle: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      mainPicturePath: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(745)]),
      additionalDescription: new FormControl('', Validators.maxLength(445)),
      mainContent: new FormControl('', Validators.maxLength(3000)),
      quote: new FormControl('', Validators.maxLength(385)),
      beggin: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      categoryDimensionId: new FormControl('', [Validators.required]),
      townshipId: new FormControl('', [Validators.required]),
      countryId: new FormControl('', [Validators.required, Validators.nullValidator] ),

    });
  }

  handleMainPictureChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedImageFile = files[0];
      this.formazadodavanjeForm.get('mainPicturePath').setValue(this.selectedImageFile);
    }
  }
  submitForm() {
    if (this.formazadodavanjeForm.valid) {

        var formData = new FormData();


        
        let nameArticle = this.formazadodavanjeForm.get('nameArticle')?.value;
        let mainPicturePath = this.formazadodavanjeForm.get('mainPicturePath')?.value;
        let description = this.formazadodavanjeForm.get('description')?.value;
        let additionalDescription = this.formazadodavanjeForm.get('additionalDescription')?.value;
        let mainContent = this.formazadodavanjeForm.get('mainContent')?.value;
        let quote = this.formazadodavanjeForm.get('quote')?.value;
        let beggin = this.formazadodavanjeForm.get('beggin')?.value;
        let end = this.formazadodavanjeForm.get('end')?.value;
        let categoryDimensionId = this.formazadodavanjeForm.get('categoryDimensionId')?.value;
        let townshipId = this.formazadodavanjeForm.get('townshipId')?.value;
 
        formData.append('MainPicture', this.selectedImageFile, this.selectedImageFile.name);
        formData.append('ArticleToAdd.NameArticle', nameArticle);
        formData.append('ArticleToAdd.Description', description);
        formData.append('ArticleToAdd.AdditionalDescription', additionalDescription);
        formData.append('ArticleToAdd.MainContent', mainContent);
        formData.append('ArticleToAdd.AdditionalDescription', additionalDescription);
        formData.append('ArticleToAdd.Quote', quote);
        formData.append('ArticleToAdd.Beggin', beggin);
        formData.append('ArticleToAdd.End', end);
        formData.append('ArticleToAdd.CategoryDimensionId', categoryDimensionId);
        formData.append('ArticleToAdd.CategoryDesignArticleId', '1');
        formData.append('ArticleToAdd.TownshipId', townshipId);
 
 
        let token = localStorage.getItem('token');
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        

        this.addPostRegService.createFormData(formData, headers).subscribe({
          next: response =>{
  
            this.formazadodavanjeForm.reset();
            const fileInput = document.getElementById('mainPicturePath') as HTMLInputElement;
            fileInput.value = '';
            this.townships=[];

            this.toastr.success('Uspešno ste dodali objavu!', 'Uspeh');
  
          },
          error: xhr =>{
            var errMessageToDisplay;
            if(xhr.error.message != undefined) errMessageToDisplay = xhr.error.message;
            if( xhr.error.errors != undefined ) errMessageToDisplay = xhr.error.errors[0].error;
            
           // console.log(xhr);
            this.toastr.error(errMessageToDisplay, 'Greška');
           // console.log(errMessageToDisplay);
  
          }
        });

    }
  }


}