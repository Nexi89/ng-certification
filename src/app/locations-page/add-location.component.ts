import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from './store.service';
import { validateZipcode } from './validate-zipcode';

@Component({
  selector: 'ffs-add-location',
  template: `
      <fieldset>
          <legend>Add a location</legend>
          <h2>Enter a zipcode:</h2>
          <input #zipcodeInput type="text" [formControl]="zipCode">
          <span class="error" *ngIf="zipCode.invalid && (zipCode.touched)">Zipcode has to be 5 numbers long</span>
          <button [disabled]="zipCode.invalid" (click)="addLocation()">Add location</button>
      </fieldset>
  `,
  styles: [`
    :host {
      fieldset {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid black;
        padding: 8px;
        flex-wrap: wrap;

        > * {
          margin-right: 8px;
        }

        .error {
          color: darkred;
        }

      }
    }
  `]
})
export class AddLocationComponent {
  zipCode = new FormControl('', validateZipcode);

  constructor(private storeService: StoreService) {
  }

  addLocation() {
    this.storeService.storeLocation(+this.zipCode.value);
    this.zipCode.reset();
  }
}
