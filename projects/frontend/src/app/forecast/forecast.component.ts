import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationData, WeatherForecast, WeatherService } from '@ffs/weather';
import { catchError, filter, map, Observable, of, switchMap } from 'rxjs';
import { LifecycleService } from '../lifecycle.service';
import { zipcodeRegEx } from '../valid-zipcode';

@Component({
  selector: 'ffs-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  providers: [LifecycleService]
})
export class ForecastComponent implements OnInit {
  forecast$?: Observable<WeatherForecast | null>

  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService, private lifecycleService: LifecycleService) {
  }

  ngOnInit(): void {
    this.forecast$ = this.activatedRoute.params.pipe(
      map(param => ({
        zipcode: param['zipcode'],
        country: param['country']
      })),
      filter((this.isLocation)),
      switchMap(location => this.weatherService.getWeatherForecast(location)),
      catchError(() => of(null)),
      this.lifecycleService.takeUntilDestroy
    );
  }

  private isLocation(location: { zipcode: unknown, country: unknown }): location is LocationData {
    const isZipcode = (zipcode: unknown): zipcode is string => typeof zipcode === 'string' && zipcodeRegEx.test(zipcode);
    const isCountry = (country: unknown): country is string => typeof country === 'string' && /^\w{2}$/.test(country);
    console.log(location, isZipcode(location.zipcode), isCountry(location.country))
    return isZipcode(location.zipcode) && isCountry(location.country);
  }
}
