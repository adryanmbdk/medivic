import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from '../../model/remedio';
import { RemedioService } from '../../services/remedio.service';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

interface SideNavToggle {
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  remedios: Remedio[];
  usuario: Usuario;
  numero: any;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController,private remedioService: RemedioService) {
    this.remedios = [];
    this.usuario = this.usuarioService.getUser();
    this.numero = 0;
  }
  
  ngOnInit() {
    this.numero = setInterval(() => {
      console.log("procurando por tarefa");
      this.verificarAlarmes();
    }, 5000);
  }

  async verificarAlarmes() {  
    this.remedioService.deleteRemedio();
    let contador = 0;
    await this.remedioService.listar(this.usuario.idUsuario).then(async (json)=>{
      this.remedios = <Remedio[]> (json);
      this.remedios.forEach((remedio) => {
        let horaNow = this.formatarDataAtual();
        let date = new Date();
        //date.setDate(date.getDate()-1);
        console.log(date);
        let dataNow = date.toISOString().split("T")[0];
        console.log(dataNow);
        console.log(remedio.nome);
        console.log("Horario de tocar: "+ remedio.horarioNovo + "\nHorario atual: "+ horaNow);
        console.log("Dia de tocar: "+ remedio.dtNovo + "\nDia atual: "+ dataNow);
        console.log("----------------------------------------------");

        if(remedio.horarioNovo === horaNow && dataNow === remedio.dtNovo){
          contador++;
          this.remedioService.addRemedio(remedio);
        }
      });
      console.log(this.remedios);
    });
    if (contador > 0){
        this.usuario.alarme = setInterval(() => {
        let audio = new Audio('assets/Osmium.ogg');
        audio.play();
      }, 3000);
      this.navController.navigateBack('/alarme');
      clearTimeout(this.numero);
      this.usuarioService.setUser(this.usuario);
    }
  }

  formatarDataAtual(){
    let now = new Date();
    let hora = now.getHours();
    let minuto = now.getMinutes();
    if(hora < 10 && minuto > 10){
      return "0" + hora + ":" + minuto;
    }else if (minuto < 10 && hora > 10){
      return hora + ":0" + minuto;
    }else if (hora < 10 && minuto < 10){
      return "0" + hora + ":0" + minuto;
    }else{
      return hora + ":" + minuto;
    }
  }

  sair(){
    clearTimeout(this.numero);
    this.usuarioService.logout();
    this.navController.navigateBack('/tela-inicial');
    this.exibirMensagem('Saindo...  ')
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
