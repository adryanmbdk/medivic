import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroDependentePageRoutingModule } from './cadastro-dependente-routing.module';

import { CadastroDependentePage } from './cadastro-dependente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroDependentePageRoutingModule
  ],
  declarations: [CadastroDependentePage]
})
export class CadastroDependentePageModule {}
