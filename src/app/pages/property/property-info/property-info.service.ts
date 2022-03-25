import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Property } from '../../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyInfoService {

  protected PROPERTIES_FINAL: string = 'properties';

  constructor(private firestore: Firestore) { }

  getProperties(): Observable<Property[]> {
    const propertiesRef = collection(this.firestore, this.PROPERTIES_FINAL);
    return collectionData(propertiesRef, { idField: 'id'}) as Observable<Property[]>;
  }

  addProperty(property: Property) {
    const propertiesRef = collection(this.firestore, this.PROPERTIES_FINAL);
    return addDoc(propertiesRef, property);
  }

  getPropertyById(id: string):Observable<Property> {
    const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${id}`);
    return docData(propertyRef, { idField: 'id' }) as Observable<Property>;
  }

  updateProperty(property: Property) {
    const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${property.id}`);
    return updateDoc(propertyRef, {
      propertyType: property.type,
      added: property.added,
      active: true,
      propertyName: property.propertyName,
      description: property.description,
      extraInfo: property.extraInfo,
      location: property.location,
      schedule: property.schedule,
      homes: property.homes,
      owners: property.owners
    })
  }

  removeProperty(pid: string) {
    const propertyRef = doc(this.firestore, `${this.PROPERTIES_FINAL}/${pid}`);
    return deleteDoc(propertyRef);
  }

}
