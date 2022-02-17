import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'iopm-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userSelection: boolean = false;
  isOwner: boolean = true;
  signUpForm: FormGroup;
  
  constructor(private _fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.signUpForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      membership: ['', [Validators.required, Validators.minLength(8)] ],
      companyName: [''],
      phone: ['', [Validators.required, Validators.pattern('^[1-9]\d{2}-\d{3}-\d{4}')]]
    })
  }

  userTypeSelection(event: CustomEvent) {
    console.log(event)
    this.isOwner = event.detail.value === 'owner';
    this.userSelection = true
    this.signUpForm.setValue({membership: event.detail.value});
  }

}
