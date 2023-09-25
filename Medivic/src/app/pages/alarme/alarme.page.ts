import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from 'src/app/model/remedio';
import { RemedioService } from 'src/app/services/remedio.service';

@Component({
  selector: 'app-alarme',
  templateUrl: './alarme.page.html',
  styleUrls: ['./alarme.page.scss'],
})
export class AlarmePage implements OnInit {
  remedios: Remedio[];
  constructor(private toastController: ToastController, private remedioService: RemedioService) { 
    this.remedios = this.remedioService.getRemedio();
  }

  ngOnInit() {
  }

  

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
