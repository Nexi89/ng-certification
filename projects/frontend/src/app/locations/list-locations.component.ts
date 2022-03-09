import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationData, Weather, WeatherService } from '@ffs/weather';
import { Observable } from 'rxjs';

@Component({
  selector: 'ffs-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.scss']
})
export class ListLocationsComponent implements OnInit {
  locations?: Observable<Array<Weather>>;

  constructor(private locationService: WeatherService, private router: Router) {
  }

  ngOnInit(): void {
    this.locations = this.locationService.getAllWeatherInformation();
  }

  delete(location: LocationData) {
    this.locationService.removeLocation(location)
  }

  openForecast(location: LocationData) {
    this.router.navigate(['forecast', location.zipcode, location.country]).catch(() => {

    })
  }
}
