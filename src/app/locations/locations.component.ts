import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
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

  constructor(
    locationService: LocationService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.locationService = locationService;
  }

  ngOnInit(): void {
    console.log("init locations component and map");
    this.updateValues();
  }

  updateValues(): void {
    this.locationService.fetch((result) => {
      this.locations = result;
      this.initMap();
      this.changeDetection.detectChanges();
    });
  }

  /* ngDoCheck() {
    if (this.locations.length > 4) {
      console.log("CHECK OVER 4");
    }
  } */

  loadMarkers(): void {
    for (const loc of this.locations) {
      const infowindow = new google.maps.InfoWindow({
        content: `<div style="color: #000;">Latitude: ${loc.latitude} Longitude: ${loc.longitude}</div>`,
      });

      const myLatLng = {
        lat: parseFloat(loc.latitude),
        lng: parseFloat(loc.longitude),
      };
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: `Lat: ${loc.latitude} Lon: ${loc.longitude}`,
      });
      marker.addListener("click", () => {
        infowindow.open(this.map, marker);
      });

      marker.setMap(this.map);

      /* this.map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(() => {
          this.map.panTo(marker.getPosition());
        }, 3000);
      }); */
    }
  }

  initMap(): void {
    // Tampere coordinates: 61.504, 23.829
    const mapProperties = {
      center: { lat: 61.504, lng: 23.829 },
      zoom: 8,
      styles: mapStyles,
      zoomControl: true,
      scaleControl: true,
    };
    this.map = new google.maps.Map(
      this.gmapElement.nativeElement,
      mapProperties
    );

    this.loadMarkers();

    this.map.addListener("rightclick", (event) => {
      // Add new marker by right click.
      const lat = event.latLng.toJSON().lat.toFixed(3);
      const lon = event.latLng.toJSON().lng.toFixed(3);
      this.postNewMarkerByClick(lat, lon);
    });
  }

  postNewMarkerByClick(lat: string, lon: string) {
    this.locationService.post(parseFloat(lat), parseFloat(lon));
    this.updateValues();
  }

  postNewLocationMarker() {
    console.log("post new location marker");
    this.locationService.post(
      parseFloat(this.latitude),
      parseFloat(this.longitude)
    );

    this.updateValues();
  }

  deleteLocation(locationId: number) {
    console.log("delete location marker at id ", locationId);
    if (this.locations.length > 1) {
      this.locationService.delete(locationId);
    } else {
      console.log("Cannot delete last location");
    }
    this.updateValues();
  }
}
