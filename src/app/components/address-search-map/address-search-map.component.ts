import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map-service/map.service';
import { GeoJson, FeatureCollection, Feature, MapboxOutput } from '../../global/models/map';
import { Observable } from 'rxjs';
import { features } from 'process';
import { Context, isContext } from 'vm';

@Component({
  selector: 'iopm-address-search-map',
  templateUrl: './address-search-map.component.html',
  styleUrls: ['./address-search-map.component.scss'],
})
export class AddressSearchMapComponent implements OnInit {

  map: mapboxgl.Map;
  lng: number;
  lat: number;

  addresses: Feature[] = [];
  selectedAddress: string = null;
  selectedFullAddress : Feature = null;
  @Output() addressSelectedEvent: EventEmitter<Feature> = new EventEmitter();

  constructor(private mapService: MapService) { }

  ngOnInit() {    
  }

  search(event: any) {
    const searchTerm = `${event.target.value.toLowerCase()} United States`;
    if (searchTerm && searchTerm.length > 0) {
      this.mapService 
        .searchWord(searchTerm)
        .subscribe((mbo: MapboxOutput) => {
          this.addresses = mbo.features;
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: Feature) {
    this.selectedFullAddress = address;
    this.selectedAddress = this.shortenAddress(address.place_name);
    this.addresses = [];
    this.addressSelectedEvent.emit(this.selectedFullAddress);
  }

  shortenAddress(placeName: string) {
    return this.mapService.shortenAddress(placeName);
  }

}
