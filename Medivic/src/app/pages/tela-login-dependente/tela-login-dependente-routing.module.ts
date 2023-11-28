import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaLoginDependentePage } from './tela-login-dependente.page';

const routes: Routes = [
  {
    path: '',
    component: TelaLoginDependentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaLoginDependentePageRoutingModule {}
