export interface LocationData {
  zipcode: string,
  country: string
}

export const locationEquals = (a: LocationData) => (b: LocationData) => a.zipcode === b.zipcode && a.country === b.country;
