import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    if (process.env.NODE_ENV === "production") {
      this.http
        .get<ItemResponse>("https://tamk-ang-map.herokuapp.com/api/locations/")
        .subscribe((jsonObject) => {
          console.log("at service fetch", jsonObject);
          callback(jsonObject);
        });
    } else {
      this.http
        .get<ItemResponse>("http://localhost:8080/api/locations/")
        .subscribe((jsonObject) => {
          console.log("at service fetch", jsonObject);
          callback(jsonObject);
        });
    }
  }

  /* post(lat: number, lon: number) {
    const body = { latitude: lat, longitude: lon };
    this.http.post<LocationResponse>('http://localhost:8080/api/locations/', body,
      { observe: 'response' }).subscribe(response => {
        console.log(response.status);
        console.log(response.body);
      });
  }

  delete(locationId: number) {
    this.http.delete(`http://localhost:8080/api/locations/${locationId}`,
      { observe: 'response', responseType: 'text' }).subscribe(response => {
        console.log('Response status:', response.status);
        console.log(`Deleted location with id ${locationId} successfully!`);
      });
  } */
}
