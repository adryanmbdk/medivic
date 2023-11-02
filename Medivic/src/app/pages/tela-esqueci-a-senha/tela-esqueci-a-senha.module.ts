import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaEsqueciASenhaPageRoutingModule } from './tela-esqueci-a-senha-routing.module';

import { TelaEsqueciASenhaPage } from './tela-esqueci-a-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaEsqueciASenhaPageRoutingModule
  ],
  declarations: [TelaEsqueciASenhaPage]
})
export class TelaEsqueciASenhaPageModule {}
