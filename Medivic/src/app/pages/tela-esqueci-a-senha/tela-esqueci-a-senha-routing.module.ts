import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaEsqueciASenhaPage } from './tela-esqueci-a-senha.page';

const routes: Routes = [
  {
    path: '',
    component: TelaEsqueciASenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaEsqueciASenhaPageRoutingModule {}
