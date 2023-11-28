import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaLoginDependentePageRoutingModule } from './tela-login-dependente-routing.module';

import { TelaLoginDependentePage } from './tela-login-dependente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaLoginDependentePageRoutingModule,
    ReactiveFormsModule,
    TelaLoginDependentePage
  ],
})
export class TelaLoginDependentePageModule {}
