import { Component } from '@angular/core';

@Component({
  selector: 'ffs-locations',
  template: `
      <ffs-add-location></ffs-add-location>
      <ffs-list-locations></ffs-list-locations>
  `,
  styles: [`
    :host {
      display: grid;
      flex-direction: column;
      justify-items: center;
      grid-gap: var(--ffs-spacing, 0);

      ffs-add-location, ffs-list-locations {
        width: 80vw;
      }
    }
  `]
})
export class LocationsPageComponent {
}
