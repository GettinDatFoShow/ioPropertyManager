import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private placesUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private addressHelper: string = '.json?types=address&access_token=';

  constructor(private _firestore: Firestore, private http: HttpClient) {
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

   searchWord(query: string) {
    return this.http.get(`${this.placesUrl}${query}${this.addressHelper}${this.getToken()}`)
   }

   shortenAddress(placeName: string) {
    const placeNameSplit: string[] = placeName.split(',');
    let shortAddress = `${placeNameSplit[0]}, ${placeNameSplit[1]}, ${placeNameSplit[2]}`;
    // console.warn(placeNameSplit[2].split(' ')[0])
    // shortAddress[shortAddress.length-2] === ',' ? shortAddress = shortAddress.slice(0, shortAddress.length-2): null;
    return shortAddress;
  }
}
