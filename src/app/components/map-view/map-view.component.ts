import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map-service/map.service';
import { GeoJson, FeatureCollection, Feature } from '../../global/models/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'iopm-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {

  map: mapboxgl.Map;
  lng: number;
  lat: number;

  // data
  source: any;
  markers: Observable<GeoJson[]>;
  @Input() address: Feature = null;

  constructor(private mapService: MapService) { 
  }

  ngOnInit() {
    // this.markers = this.mapService.getMarkers();
    console.warn(this.address);
    this.intializeMap();
  }

  private intializeMap() {
    this.lat = this.address.geometry.coordinates[1];
    this.lng = this.address.geometry.coordinates[0];
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

    // this.map.jumpTo({
    //   center: [this.lng, this.lat]
    // })

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
      })
      // this.map.addLayer({
      //   id: 'firebase',
      //   source: 'firebase',
      //   type: 'circle',
      //   paint: {
      //     "circle-color":'blue',
      //     'circle-radius': 15
      //   }
      // })

      const marker1 = new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .addTo(this.map);
      });

  }

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key);
  }
  
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: [data.geometry.coordinates[0], data.geometry.coordinates[1]]
    })
  }

}
