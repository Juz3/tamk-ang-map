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

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetch(callback) {
    console.log("at get");
    this.http
      .get<ItemResponse>(
        environment.production
          ? "https://tamk-ang-map.herokuapp.com/api/locations/"
          : "http://localhost:5000/api/locations/"
      )
      .subscribe((jsonObject) => {
        console.log("at service fetch", jsonObject);
        callback(jsonObject);
      });
  }

  post(lat: number, lon: number) {
    const body = { latitude: lat, longitude: lon };
    console.log("at post, body:", body);
    this.http
      .post<LocationResponse>(
        environment.production
          ? "https://tamk-ang-map.herokuapp.com/api/locations/new"
          : "http://localhost:5000/api/locations/new",
        body,
        {
          observe: "response",
        }
      )
      .subscribe((response) => {
        console.log(response.status);
        console.log(response.body);
      });
  }

  delete(locationId: number) {
    this.http
      .delete(
        environment.production
          ? `https://tamk-ang-map.herokuapp.com/api/locations/${locationId}`
          : `http://localhost:5000/api/locations/${locationId}`,
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
