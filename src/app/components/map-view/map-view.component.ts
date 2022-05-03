import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map-service/map.service';
import { GeoJson, FeatureCollection } from '../../global/models/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'iopm-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lng = 39.20790558089202;
  lat = -75.56045651439442;
  message = 'Hello World';

  firebaseData = {
    "messages" : {
      "-KUE2EwfvbI48Azw01Hv" : {
        "geometry" : {
          "coordinates" : [ 28.6618976, 77.22739580000007 ],
          "type" : "Point"
        },
        "properties" : {
          "description" : "xyz",
          "hashtag" : "#xyz",
          "imageUrl" : "xyz.jpg",
          "name" : "Xyz Xyz",
          "photoUrl" : "xyz.jpg",
          "title" : "XYZ"
        },
        "type" : "Issue"
      },
      "-KUD2EwfvbI48Azw01Hv" : {
        "geometry" : {
          "coordinates" : [ 12.9715987, 77.59456269999998 ],
          "type" : "Point"
        },
        "properties" : {
          "description" : "xyz",
          "hashtag" : "#xyz",
          "imageUrl" : "xyz.jpg",
          "name" : "Xyz Xyz",
          "photoUrl" : "xyz.jpg",
          "title" : "XYZ"
        },
        "type" : "Issue"
      }
    }
  }
  firebaseGeojsonFeatures = [];
  // data
  source: any;
  markers: Observable<GeoJson[]>;

  constructor(private mapService: MapService) { 
  }

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.intializeMap();
  }

  private intializeMap() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
        console.log(position);
      })
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: this.mapService.getToken(),
      container: 'map',
      style: this.style, 
      zoom: 13,
      center: [this.lng, this.lat]
    });

    const marker1 = new mapboxgl.Marker()
    .setLngLat([this.lat, this.lng])
    .addTo(this.map)

    for (const key in this.firebaseData.messages) {
      let m = this.firebaseData.messages[key];
      m.type = 'Feature';
      this.firebaseGeojsonFeatures.push(m);
    }
    // this.map.addControl(new mapboxgl.NavigationControl());

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
          features: this.firebaseGeojsonFeatures
        }
      })
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


    // console.log(this.map)
    // this.source = this.map.getSource('firebase');
    // console.log(this.source);
    // this.markers.subscribe(markers => {
    //   let data = new FeatureCollection(markers);
    //   console.log(data);
    //   this.source.setData(data);
    // });

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
