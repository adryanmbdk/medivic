import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroRemedioPageRoutingModule } from './cadastro-remedio-routing.module';

import { CadastroRemedioPage } from './cadastro-remedio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroRemedioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CadastroRemedioPage]
})
export class CadastroRemedioPageModule {}
