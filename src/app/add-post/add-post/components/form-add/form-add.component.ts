import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/constant/API';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { ICountry } from 'src/app/shared/interfaces/i-country';
import { ITownship } from 'src/app/shared/interfaces/i-township';
import { AddPostNoregService } from 'src/app/shared/services/add-post-noreg/add-post-noreg.service';
import { CountryService } from 'src/app/shared/services/country/country.service';
import { TownshipService } from 'src/app/shared/services/township/township.service';
 
@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent  implements OnInit {
  
  public formazadodavanjeForm: FormGroup;
  
  countries : ICountry[];
  townships : any;
 
  selectedImageFile : any;

  constructor(private countryService : CountryService,
              private townshipService : TownshipService,
              private addPostNoregService : AddPostNoregService,
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

 

  // Možete dodati ostalu logiku koja treba da se izvrši nakon promene selekcije
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
      firstName: new FormControl('', [  Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/) 
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^\b[A-Z][a-zA-Z]{2,}\b/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.email
      ]),
      phoneNumber: new FormControl('', [ Validators.maxLength(15)] ),

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
        let firstName = this.formazadodavanjeForm.get('firstName')?.value;
        let lastName = this.formazadodavanjeForm.get('lastName')?.value;
        let email = this.formazadodavanjeForm.get('email')?.value;
        var phoneNumber = this.formazadodavanjeForm.get('phoneNumber').value;
       
        //console.log(!phoneNumber);
        if(!phoneNumber) {
          phoneNumber = null;
          //console.log(phoneNumber);
          //console.log(phoneNumber);

        }  

        //alert(phoneNumber);

  
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
        formData.append('NonRegisteredUserToAdd.FirstName', firstName);
        formData.append('NonRegisteredUserToAdd.LastName', lastName);
        formData.append('NonRegisteredUserToAdd.Email', email);
        formData.append('NonRegisteredUserToAdd.PhoneNumber', phoneNumber);
 

        this.addPostNoregService.createFormData(formData).subscribe({
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
            
            console.log(xhr);
            this.toastr.error(errMessageToDisplay, 'Greška');
            console.log(errMessageToDisplay);
  
          }
        });

    }
  }


}