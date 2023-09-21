import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuPerfilPageRoutingModule } from './meu-perfil-routing.module';

import { MeuPerfilPage } from './meu-perfil.page';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuPerfilPageRoutingModule,
    ReactiveFormsModule,
    RouterLink
  ],
  declarations: [MeuPerfilPage]
})
export class MeuPerfilPageModule {}
