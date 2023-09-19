import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediosPageRoutingModule } from './remedios-routing.module';

import { RemediosPage } from './remedios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediosPageRoutingModule
  ],
  declarations: [RemediosPage]
})
export class RemediosPageModule {}
