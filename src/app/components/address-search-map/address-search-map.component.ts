import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map-service/map.service';
import { GeoJson, FeatureCollection } from '../../global/models/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'iopm-address-search-map',
  templateUrl: './address-search-map.component.html',
  styleUrls: ['./address-search-map.component.scss'],
})
export class AddressSearchMapComponent implements OnInit {

  @Input() address: any;

  map: mapboxgl.Map;
  lng: number;
  lat: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {    
    // this.intializeMap();
  }

  private intializeMap() {
    // TO DO: replace with property or home coords.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.jumpTo({
          center: [this.lng, this.lat]
        })
      })
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: this.mapService.getToken(),
      container: 'map',
      style: this.mapService.getMapStyle(), 
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coordinates);
      this.mapService.createMarker(newMarker);
    });

    this.map.on('load', (event) => {
      console.log('map load event fired')
      this.map.addSource('firebase', {
        type: 'geojson', 
        data: {
          type: 'FeatureCollection', 
          features: []
        }
      });
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'circle',
        paint: {
          "circle-color":'blue',
          'circle-radius': 15
        }
      })
    });

  }

}
