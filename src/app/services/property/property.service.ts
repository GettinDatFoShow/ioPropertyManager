import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; 
import { Company, Property } from '../../global/models/globals.model';
import { CompanyService } from '../company/company.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  COMPANIES_KEY = 'Companies';

  constructor(private firestore: Firestore, private companyService: CompanyService) { }

  // getAllProperties(): Observable<Property[]> {
  //   const propertiesRef = collection(this.firestore, this.PROPERTIES_FINAL);
  //   return collectionData(propertiesRef, { idField: 'id'}) as Observable<Property[]>;
  // }

  // getPropertiesByCompanyId(cid: string): Observable<Property[]> {
  //   const propertiesRef = collection(this.firestore, this.PROPERTIES_FINAL);
  //   return collectionData(propertiesRef, { idField: 'id'}) as Observable<Property[]>;
  // }

  // addProperty(property: Property, company: Company) {
  //   company.properties.push(property);
  //   return this.companyService.updateCompany(company);
  // }

  // getPropertyById(pid: string):Observable<Property> {
  //   const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${pid}`);
  //   return docData(propertyRef, { idField: 'pid' }) as Observable<Property>;
  // }

  // updateProperty(property: Property) {
  //   const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${property.pid}`);
  //   return updateDoc(propertyRef, {
  //     propertyType: property.type,
  //     added: property.added,
  //     active: true,
  //     propertyName: property.propertyName,
  //     description: property.description,
  //     extraInfo: property.extraInfo,
  //     location: property.location,
  //     schedule: property.schedule,
  //     homes: property.homes,
  //     owners: property.owners
  //   })
  // }

  // removeProperty(pid: string) {
  //   const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${pid}`);
  //   return deleteDoc(propertyRef);
  // }
}
