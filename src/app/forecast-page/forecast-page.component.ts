import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, map, Observable, of, switchMap } from 'rxjs';
import { zipcodeRegEx } from '../valid-zipcode';
import { WeatherForecast } from '../weather/weather';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'ffs-forecast-page',
  template: `
      <button routerLink="/">back</button>
      <fieldset *ngIf="forecast$ | async; let forecast">
          <legend class="heading">{{forecast.name}} ({{forecast.location}})</legend>
          <div class="day" *ngFor="let day of forecast.days">
              <span>{{day.day}}: {{day.weather}} - High: {{day.tempMax}} - Low: {{day.tempMin}}</span>
              <div class="spacer"></div>
              <img alt="weather-icon" [src]="day.icon">
          </div>
      </fieldset>
      <p *ngIf="!(forecast$ | async)">Could not fetch data.</p>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      fieldset {
        box-sizing: border-box;
        display: flex;
        align-self: center;
        justify-content: space-between;
        flex-direction: column;
        align-items: stretch;
        border: 1px solid black;
        width: 80vw;
      }

      .day {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.5rem;
      }

      img {
        width: 1rem;
        height: 1rem;
      }
    }
  `]
})
export class ForecastPageComponent implements OnInit {
  forecast$?: Observable<WeatherForecast | null>

  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.forecast$ = this.activatedRoute.params.pipe(map(param => param['zipcode']), filter((zipcode): zipcode is number => {
      return zipcodeRegEx.test(zipcode)
    })).pipe(switchMap(zipcode => this.weatherService.getWeatherForecast(zipcode)), catchError(() => {
      return of(null);
    }));
  }

}
