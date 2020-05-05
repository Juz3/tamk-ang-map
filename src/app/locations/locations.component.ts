import { Component, OnInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
/* import Location from "../location";
import { LocationService } from "../location.service"; */
import {} from "googlemaps";

@Component({
  selector: "app-locations",
  templateUrl: "locations.component.html",
  styleUrls: ["locations.component.css"],
})
export class LocationsComponent implements OnInit {
  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: google.maps.Map;

  /* locations: Location[] = [];
  locationService: LocationService;
  latitude: number;
  longitude: number; */

  /* constructor(locationService: LocationService) {
    // this.locations = locationService.fetch();
    this.locationService = locationService;
  } */

  ngOnInit(): void {
    console.log("init locationscomponent");
    this.initMap();
    /* this.locationService.fetch((result) => {
      this.locations = result;
      console.log("result:", result);

      this.initMap();
    }); */
  }

  initMap(): void {
    console.log("init map");
    // Tampere coordinates: 61.504, 23.829
    const mapProperties = {
      zoom: 4,
      center: { lat: 61.504, lng: 23.829 },
    };
    /* this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties); */

    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: { lat: 40.674, lng: -73.945 },
      zoom: 12,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });

    /* console.log("locs", this.locations); */

    /* for (const loc of this.locations) {
      const myLatLng = { lat: loc.latitude, lng: loc.longitude };
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Hello World!",
      });

      marker.setMap(this.map);
    } */
  }

  /* postNew() {
    console.log('post new');
    this.locationService.post(this.latitude, this.longitude);
  }

  delete(locationId: number) {
    console.log('delete loc');
    this.locationService.delete(locationId);
  } */
}
