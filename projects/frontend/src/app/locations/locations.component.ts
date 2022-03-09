import { Component } from '@angular/core';

@Component({
  selector: 'ffs-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  noApiKey = !localStorage.getItem('API_KEY');
}
