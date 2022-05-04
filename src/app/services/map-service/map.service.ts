import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GeoJson } from '../../global/models/map';
import * as mapboxgl from 'mapbox-gl';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
import { collection, DocumentReference  } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  MARKERS: string = 'markers';
  private token: string = environment.mapBox.accessToken;
  private mapStyle: string = 'mapbox://styles/mapbox/streets-v11';

  constructor(private _firestore: Firestore) {
   }

   getMarkers(): Observable<GeoJson[]> {
    const markersRef = collection(this._firestore, this.MARKERS);
    return collectionData(markersRef, {idField: 'markerId'}) as Observable<any>;
   }

   createMarker(data: GeoJson): Promise<DocumentReference> {
      const markersRef = collection(this._firestore, this.MARKERS);
      return addDoc(markersRef, data)
   }

   removeMarker($key: string): Promise<any> {
     const markerDocRef = doc(this._firestore, `${this.MARKERS}/${$key}`);
     return deleteDoc(markerDocRef);
   }
   
   getToken(): string {
     return this.token;
   }

   getMapStyle(): string {
     return this.mapStyle;
   }

}
