import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediosDependentePageRoutingModule } from './remedios-dependente-routing.module';

import { RemediosDependentePage } from './remedios-dependente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediosDependentePageRoutingModule
  ],
  declarations: [RemediosDependentePage]
})
export class RemediosDependentePageModule {}
