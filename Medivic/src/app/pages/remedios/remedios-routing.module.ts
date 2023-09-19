import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosPage } from './remedios.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosPageRoutingModule {}
