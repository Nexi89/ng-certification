import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [{
  path: 'forecast/:zipcode/:country',
  component: ForecastComponent
}, {
  path: '**',
  component: LocationsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
