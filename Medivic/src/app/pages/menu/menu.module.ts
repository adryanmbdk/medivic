import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RemedioService } from 'src/app/services/remedio.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
//import { NavbarComponentModule } from 'src/app/components/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    NavbarComponent
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
