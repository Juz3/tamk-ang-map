import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

interface ItemResponse {
  count: number;
  next: string;
  previous: string;
  results: [Location];
}

interface LocationResponse {
  id: number;
  latitude: number;
  longitude: number;
}

@Injectable()
export class LocationService {
  private http: HttpClient;
  private url: string;
  private devUrl: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = "https://tamk-ang-map.herokuapp.com";
    this.devUrl = "http://localhost:5000";
  }

  fetch(callback) {
    console.log("at get");
    this.http
      .get<ItemResponse>(
        environment.production
          ? `${this.url}/api/locations/`
          : `${this.devUrl}/api/locations/`
      )
      .subscribe((jsonObject) => {
        console.log("at service fetch", jsonObject);
        callback(jsonObject);
      });
  }

  post(lat: number, lon: number) {
    if (lat > -90 && lat < 90 && lon > -180 && lon < 180) {
      const body = { latitude: lat, longitude: lon };
      console.log("at post, body:", body);
      this.http
        .post<LocationResponse>(
          environment.production
            ? `${this.url}/api/locations/new`
            : `${this.devUrl}/api/locations/new`,
          body,
          {
            observe: "response",
          }
        )
        .subscribe((response) => {
          if (response.status === 201) {
            console.log("insert new location successfully");
          } else {
            console.log("Response status:", response.status);
          }
        });
    } else {
      console.log(
        "Latitude must be between -90 and 90. Longitude must be between -180 and 180."
      );
    }
  }

  delete(locationId: number) {
    this.http
      .delete(
        environment.production
          ? `${this.url}/api/locations/${locationId}`
          : `${this.devUrl}/api/locations/${locationId}`,
        {
          observe: "response",
          responseType: "text",
        }
      )
      .subscribe((response) => {
        console.log("Response status:", response.status);
        console.log(`Deleted location with id ${locationId} successfully!`);
      });
  }
}
