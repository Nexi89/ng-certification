import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StatusButtonComponent } from '@ffs/status-button';
import { WeatherService } from '@ffs/weather';
import { of, switchMap, tap } from 'rxjs';
import { AutocompleteInput } from '../../../../autocomplete/src/lib/autocomplete-item/autocomplete-item';
import { Region, REGIONS } from '../regions';
import { zipcodeRegEx } from '../valid-zipcode';

@Component({
  selector: 'ffs-add-location',
  templateUrl: './add-location.component.html'
})
export class AddLocationComponent {
  form: FormGroup
  addLocationTask = of(null).pipe(switchMap(() => this.addLocation()));
  items: AutocompleteInput[] = this.regions.map(({ region, code }) => ({ label: region, value: code }))

  @ViewChild(StatusButtonComponent) set statusButton(value: StatusButtonComponent) {
    value?.statusConsumer.setResetTime(1000);
  }

  constructor(private weatherService: WeatherService, @Inject(REGIONS) private regions: Region[], private fb: FormBuilder) {
    const zipcodeValidator: ValidatorFn = ({ value }) => zipcodeRegEx.test(value) ? null : { zipcodeFormat: true }

    this.form = fb.group({
      zipcode: ['', zipcodeValidator],
      region: ['', Validators.required]
    })
  }

  addLocation() {
    return this.weatherService.addLocation({
      zipcode: this.form.value.zipcode,
      country: this.form.value.region.value
    }).pipe(
      tap(() => this.form.reset())
    );
  }
}
