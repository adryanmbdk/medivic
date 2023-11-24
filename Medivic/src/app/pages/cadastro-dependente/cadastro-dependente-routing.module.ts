import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroDependentePage } from './cadastro-dependente.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDependentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroDependentePageRoutingModule {}
