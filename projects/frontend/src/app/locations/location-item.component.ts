import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationData, Weather } from '@ffs/weather';

@Component({
  selector: 'ffs-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
})
export class LocationItemComponent {

  @Output() close = new EventEmitter<LocationData>()
  @Output() open = new EventEmitter<LocationData>()
  @Input() weather!: Weather;


  onClose() {
    this.close.emit(this.weather.location);
  }

  onOpen() {
    this.open.emit(this.weather.location)
  }
}
