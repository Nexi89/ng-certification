import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastPageComponent } from './forecast-page/forecast-page.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

const routes: Routes = [{
  path: 'forecast/:zipcode',
  component: ForecastPageComponent
}, {
  path: '**',
  component: LocationsPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
