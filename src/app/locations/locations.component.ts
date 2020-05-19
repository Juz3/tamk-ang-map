import { Component, OnInit, ViewChild } from "@angular/core";
import Location from "../location";
import mapStyles from "./mapStyles";
import { LocationService } from "../location.service";
import {} from "googlemaps";

@Component({
  selector: "app-locations",
  templateUrl: "locations.component.html",
  styleUrls: ["locations.component.css"],
})
export class LocationsComponent implements OnInit {
  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: google.maps.Map;

  locations: Location[] = [];
  locationService: LocationService;
  latitude: string;
  longitude: string;

  constructor(locationService: LocationService) {
    // this.locations = locationService.fetch();
    this.locationService = locationService;
  }

  ngOnInit(): void {
    console.log("init locations component and map");
    // this.initMap();
    this.locationService.fetch((result) => {
      this.locations = result;
      console.log("result:", result);

      this.initMap();
    });
  }

  loadMarkers(): void {
    console.log("locs", this.locations);

    for (const loc of this.locations) {
      const myLatLng = {
        lat: parseFloat(loc.latitude),
        lng: parseFloat(loc.longitude),
      };
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Example marker",
      });
      marker.setMap(this.map);
    }
  }

  initMap(): void {
    console.log("init map");
    // Tampere coordinates: 61.504, 23.829

    /*const mapProperties = {
       zoom: 4,
      center: { lat: 61.504, lng: 23.829 },
    };*/
    /* this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties); */

    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: { lat: 61.504, lng: 23.829 },
      zoom: 8,
      styles: mapStyles,
    });

    this.loadMarkers();
  }

  /* ngOnChanges(): void {
    console.log("on changes, load again");
    this.locationService.fetch((result) => {
      this.locations = result;
      console.log("result:", result);

      this.initMap();
    });
  } */

  postNewLocationMarker() {
    console.log("post new location marker");
    this.locationService.post(
      parseFloat(this.latitude),
      parseFloat(this.longitude)
    );

    this.loadMarkers();

    // google.maps.event.trigger(this.map, "resize");
  }

  deleteLocation(locationId: number) {
    console.log("delete location marker at id ", locationId);
    if (this.locations.length > 2) {
      this.locationService.delete(locationId);
    } else {
      console.log("cant delete last location");
    }
    this.loadMarkers();
  }
}
