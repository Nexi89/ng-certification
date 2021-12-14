import { ValidatorFn } from '@angular/forms';
import { zipcodeRegEx } from '../valid-zipcode';

export const validateZipcode: ValidatorFn = ({ value }) => {
  if (zipcodeRegEx.test(value)) {
    return null;
  }
  return { zipcodeFormat: true };
}
