import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from '../../model/remedio';
import { RemedioService } from '../../services/remedio.service';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  remedios: Remedio[];
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController,private remedioService: RemedioService) {
    this.remedios = [];
    this.usuario = this.usuarioService.getUser();
  }
  
  ngOnInit() {
    let numero = setInterval(() => {
      console.log("procurando por tarefa");
      this.verificarAlarmes();
    }, 10000);
  }

  async verificarAlarmes() {  
    await this.remedioService.listar(this.usuario.idUsuario).then(async (json)=>{
      this.remedios = <Remedio[]> (json);
      this.remedios.forEach((remedio) => {
        let horaNow = this.formatarDataAtual();
        console.log("Horario de tocar: "+ remedio.horarioNovo + "\nHorario atual: "+ horaNow);
        if(remedio.horarioNovo === horaNow){
          setInterval(() => {
            let audio = new Audio('assets/beep.mp3');
            console.log(remedio.nome);
            audio.play();
          }, 5000);
          this.navController.navigateBack('/alarme');
        }
      });
      console.log(this.remedios);
    });
  }

  formatarDataAtual(){
    let now = new Date();
    let hora = now.getHours();
    let minuto = now.getMinutes();

    return hora + ":" + minuto;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
