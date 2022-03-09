import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { AutocompleteModule } from './libs/autocomplete';
import { StatusButtonModule } from './libs/status-button';
import { RemoveUnknownCitiesService } from './libs/weather';
import { AddLocationComponent } from './locations/add-location.component';
import { ListLocationsComponent } from './locations/list-locations.component';
import { LocationItemComponent } from './locations/location-item.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    AddLocationComponent,
    ListLocationsComponent,
    LocationItemComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StatusButtonModule,
    AutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RemoveUnknownCitiesService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
