import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company/company.service';
import { ContactDetails, Company, Person, User } from '../../global/models/globals.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NotificationPopupService } from '../../services/notification-popup/notification-popup.service';
import { Feature } from '../../global/models/map';
import { MapService } from '../../services/map-service/map.service';
import { docData, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'iopm-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userSelection: boolean = false;
  isOwner: boolean = null;
  public signUpForm: FormGroup;
  companyForm: FormGroup;
  companies: Company[] = [];
  company: Company = null;
  user: User = null;
  selectedFullAddress: Feature = null;
  searchAddressShown: boolean = null;

  constructor(
    private _fb: FormBuilder, 
    private _companyService: CompanyService, 
    private _loadingController: LoadingController,
    private userService: UserService,
    private _router: Router,
    private _alertController: AlertController,
    private notficationPopupService: NotificationPopupService,
    private mapService: MapService
    ) { 
    this._companyService.getCompanies().subscribe(res => {
      console.log('COMPANIES');
      console.log(res);
    })
  }

  ngOnInit() {
    this.signUpForm = this._fb.group({
      signInEmail: ['', [Validators.required, Validators.email]],
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      memberType: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      company: [''],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      contactType: ['', [Validators.required]],
      password: ['', [Validators.required, this.createPasswordStrengthValidator(), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  userEmployerInput(event: any) {
    this.company = event.detail.value;
    this.signUpForm.setValue({companyName: this.company.name})
    this.signUpForm.setValue({company: this.company})
  }

  userTypeSelection(event: any) {
    this.isOwner = event.detail.value === 'owner';
    this.userSelection = true
    this.signUpForm.value['memberType'] = event.detail.value;
    if (this.isOwner) {
      this.companyForm = this._fb.group({
        email: ['', [Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(8)]],
        lcoation: [null],
        website: [''],
      })
    }
  }

  confirmPassword(): boolean {
    if (this.signUpForm.get('confirmPassword').dirty && this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
        return false;
    }
    return true;
  }

  passwordWarningCheck(): boolean {
    return this.signUpForm.get('password').invalid && this.signUpForm.get('password').dirty;
  }

  protected createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  async signUp() {
    
    const loading = await this._loadingController.create();
    await loading.present();

    this.user = {
        signInEmail: this.signUpForm.get('signInEmail').value,
        joinDate: new Date(),
        active: true,
        isOwner: this.isOwner,
        personalInfo: <Person> {
          first: this.signUpForm.get('first').value,
          last: this.signUpForm.get('last').value,
          contactDetails: [{
            phone: this.signUpForm.get('phone').value,
            email: this.signUpForm.get('signInEmail').value,
          }]
        }
    }
    if (this.isOwner) {
      this.company = {
        contactDetails: <ContactDetails> {
          phone: this.companyForm.get('phone').value,
          email: this.companyForm.get('email').value,
          website: this.companyForm.get('website').value
        },
        location: this.selectedFullAddress,
        addedDate: new Date(),
        properties: [],
        employees: []
      }
      await this.addCompany(this.company).then( ref => {
        this.company.cid = ref.id;
        this.user.companyId = this.company.cid;
      })

    } else {
      this.user.companyId = this.company.cid;
    }

    await this.userService.signUp({email: this.signUpForm.get('signInEmail').value, password: this.signUpForm.get('password').value}).then(async res => {
      console.log('RESULT OF SIGNUP');
      console.log(res);
      this.user.uid = res.user.uid;
      await this.userService.createUser(this.user).then(res=>{
        this.userService.setCurrentUser(this.user);
        loading.dismiss();
        this.notficationPopupService.presentToast('Account Created Successfully!', 'success', 'thumbs-up-outline')
        // THIS IS NEW *** NEED TO TEST BELOW CODE ***
        this.userService.getUser(this.user.uid).then((snapshot: QuerySnapshot<DocumentData>)=> {
          snapshot.forEach( (userRef)=> {
            docData(userRef.ref, { idField: 'uid' }).subscribe( (user)=> {
              this.userService.currentUser = user;
              
              loading.dismiss();
              this._router.navigateByUrl('/tabs', {replaceUrl: true});
            });
            // this.loadingUserData = false;
          });
        });
      })
    }, async err => {
      loading.dismiss();
      const alert = await this._alertController.create({
        header: 'Sign up failed', 
        message: err.message, 
        buttons: ['OK']
      });
      await alert.present(); 
    })
  }

  onAddressSelection(address: Feature) {
    this.selectedFullAddress = address;
    this.companyForm.value['location'] = this.selectedFullAddress;
    this.searchAddressShown = false;
  }

  showAddressSearch() {
    this.searchAddressShown = true;
  }

  removeAddress() {
    this.selectedFullAddress = null;
    this.searchAddressShown = true;
  }

  shortenAddress(placeName: string) {
    return this.mapService.shortenAddress(placeName);
  }

  async addCompany(company: Company) {
    return await this._companyService.createNew(company)
  }

  get signUpEmail() {
    return this.signUpForm.get('signUpEmail');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirm_password() {
    return this.signUpForm.get('confirmPasword')
  }

}
