import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection, DocumentReference  } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { Company } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  COMPANIES_KEY = 'Companies';
  public currentCompanyId: string = null;
  companyTabLock: Subject<Company> = new Subject<Company>();

  constructor(private _firestore: Firestore) { }

  createNew(company: Company): Promise<DocumentReference> {
    const companiesRef = collection(this._firestore, this.COMPANIES_KEY);
    return addDoc(companiesRef, company);
  }

  getCompany(cid: string): Observable<Company> {
    const companyDocRef = doc(this._firestore, `${this.COMPANIES_KEY}/${cid}`);
    return docData(companyDocRef, {idField: 'cid'}) as Observable<Company>;
  }

  getCompanies(): Observable<Company[]> {
    const companiesRef = collection(this._firestore, this.COMPANIES_KEY);
    return collectionData(companiesRef, {idField: 'cid'}) as Observable<Company[]>;
  }

  updateCompany(company: Company): Promise<any> {
    const companyDocRef = doc(this._firestore, `${this.COMPANIES_KEY}/${company.cid}`);
    return updateDoc(companyDocRef, {
      contactDetails: company.contactDetails,
      location: company.location,
      properties: company.properties,
      employees: company.employees
    });
  }

  deleteCompany(companyKey: string): Promise<any> {
    const companyDocRef = doc(this._firestore, `${this.COMPANIES_KEY}/${companyKey}`);
    return deleteDoc(companyDocRef);
  }

  setCurrentCompanyId(cid: string) {
    this.currentCompanyId = cid;
    console.log('setting company id');
    console.log(this.currentCompanyId);
  }

  getCurrentCompanyId(): string {
    console.log('returning companyId')
    console.log(this.currentCompanyId);
    return this.currentCompanyId;
  }

  unlockTabs(company: Company) {
    this.companyTabLock.next(company);
  }

}
