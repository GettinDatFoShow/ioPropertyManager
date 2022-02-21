import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Company } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  COMPANIES_KEY = 'Companies';

  constructor(private _firestore: AngularFirestore) { }

  createNew(company: Company)  {
    return this._firestore.collection(this.COMPANIES_KEY).add(company);
  }

  getCompanies() {
    return this._firestore.collection(this.COMPANIES_KEY);
  }

  updateCompany(company: Company) {
    
  }

  deleteCompany(companyKey: string) {

  }

}
