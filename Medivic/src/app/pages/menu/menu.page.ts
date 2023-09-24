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

    let now = new Date().toISOString()  ;
    console.log(now);
  }

  async verificarAlarmes() {  
    await this.remedioService.listar(this.usuario.idUsuario).then(async (json)=>{
      this.remedios = <Remedio[]> (json);
      console.log(this.remedios);
    });
  
    // let dataAtual = new Date();
    // let minutoAtual = dataAtual.getMinutes();
    // this.remedios.forEach((remedio) => {
    //   if ((remedio.dataAtual == minutoAtual) && (remedio.situacao == false)) {
    //     remedio.situacao = true;
    //     remedio.numero = setInterval(() => {
    //       let audio = new Audio('assets/louco-e-sonhador.mp3');
    //       console.log(remedio.descricao);
    //       audio.play();
    //       this.navController.navigateBack('/alarme');
    //     }, 7000);
    //     this.remedioService.salvar(remedio);
    //   }
    // });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
