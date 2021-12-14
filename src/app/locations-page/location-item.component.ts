import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Weather } from '../weather/weather';

@Component({
  selector: 'ffs-location-item',
  template: `
      <fieldset>
          <legend> {{weather.name}}</legend>
          <button class="close" (click)="onClose()">X</button>
          <div class="content">
              <p>Current conditions: {{weather.weather}}</p>
              <p>Temperature: {{weather.temp}}</p>
              <p>Max today: {{weather.tempMax}} - Min today: {{weather.tempMin}}</p>
              <button (click)="onOpen()">forecast</button>
          </div>
          <img alt="weather-icon"  class="weather-icon" [src]="weather.icon">
      </fieldset>
  `,
  styles: [`
    fieldset {
      display: grid;
      box-sizing: border-box;
      border: 1px solid black;

      grid-template-areas: ". close" "content image";

      .weather-icon {
        width: 12rem;
        height: 12rem;
        grid-area: image;
        justify-self: end;
        align-self: center;
      }

      .close {
        grid-area: close;
        justify-self: end;
        border: none;
        background: none;

        &:hover {
          color: blue;
          font-weight: bold;
        }
      }

      > a {
        text-decoration-line: underline;
      }

      .content {
        grid-area: content;
        align-self: center;
      }
    }
  `]
})
export class LocationItemComponent {

  @Output() close = new EventEmitter<number>()
  @Output() open = new EventEmitter<number>()
  @Input() weather!: Weather;


  onClose() {
    this.close.emit(this.weather.location);
  }

  onOpen() {
    this.open.emit(this.weather.location)
  }
}
