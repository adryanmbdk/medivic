import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosDependentePage } from './remedios-dependente.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosDependentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosDependentePageRoutingModule {}
