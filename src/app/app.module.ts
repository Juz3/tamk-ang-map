import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
// import { GoogleMapsModule } from "@angular/google-maps";
import { AppComponent } from "./app.component";
import { LocationsComponent } from "./locations/locations.component";
import { LocationService } from "./location.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, LocationsComponent],
  imports: [
    BrowserModule,
    /* GoogleMapsModule */
    FormsModule,
    HttpClientModule,
  ],
  providers: [LocationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
