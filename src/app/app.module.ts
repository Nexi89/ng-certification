import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastPageComponent } from './forecast-page/forecast-page.component';
import { AddLocationComponent } from './locations-page/add-location.component';
import { ListLocationsComponent } from './locations-page/list-locations.component';
import { LocationItemComponent } from './locations-page/location-item.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsPageComponent,
    AddLocationComponent,
    ListLocationsComponent,
    LocationItemComponent,
    ForecastPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
