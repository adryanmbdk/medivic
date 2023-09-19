import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaCadastroPageRoutingModule } from './tela-cadastro-routing.module';

import { TelaCadastroPage } from './tela-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaCadastroPageRoutingModule,
    ReactiveFormsModule,
    TelaCadastroPage
  ],
})
export class TelaCadastroPageModule {}
