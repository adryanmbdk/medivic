import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from '../../model/remedio';
import { RemedioService } from '../../services/remedio.service';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { HorarioService } from 'src/app/services/horario.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  remedios: Remedio[];
  dependentes: Usuario[];
  usuario: Usuario;
  numero: any;

  constructor(private usuarioService: UsuarioService, private horarioService: HorarioService, private toastController: ToastController, private navController: NavController, private remedioService: RemedioService) {
    this.remedios = [];
    this.dependentes = [];
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
    this.usuarioService.deleteUsuarioRemedio();
    let contador = 0;

    this.fillRemedios();

    this.remedios.forEach((remedio) => {
      let horaNow = this.horarioService.formatarDataAtual();
      let date = this.adjustTimeZone(horaNow);
      console.log(date);
      let dataNow = date.toISOString().split("T")[0];
      console.log(dataNow);
      console.log(remedio.nome);
      console.log("Horario de tocar: " + remedio.horarioNovo + "\nHorario atual: " + horaNow);
      console.log("Dia de tocar: " + remedio.dtNovo + "\nDia atual: " + dataNow);
      console.log("----------------------------------------------");

      if (remedio.horarioNovo === horaNow && dataNow === remedio.dtNovo) {
        contador++;
        this.remedioService.addRemedio(remedio);
        this.usuarioService.get(remedio.idUsuario).then(async (json) => {
          let usuario = <Usuario>(json);
          this.usuarioService.addUsuarioRemedio(usuario);
        });
      }
      console.log(this.remedios);
    });
    if (contador > 0) {
      this.usuario.alarme = setInterval(() => {
        let audio = new Audio('assets/Osmium.ogg');
        audio.play();
      }, 3000);
      this.navController.navigateBack('/alarme');
      clearTimeout(this.numero);
      this.usuarioService.setUser(this.usuario);
    }
  }

  adjustTimeZone(hora: string) {
    let date = new Date();
    if (hora.split(":")[0] == "21" || hora.split(":")[0] == "22" || hora.split(":")[0] == "23") {
      date.setHours(date.getHours() - 3);
      return date;
    } else {
      return date;
    }
  }

  sair() {
    clearTimeout(this.numero);
    this.usuarioService.logout();
    this.navController.navigateBack('/tela-inicial');
    this.exibirMensagem('Saindo...  ')
  }

  async fillRemedios(){
    this.fillDependentes();
    await this.remedioService.listar(this.usuario.idUsuario).then(async (json) => {
      this.remedios = <Remedio[]>(json);
      for (let dependente of this.dependentes){
        await this.remedioService.listar(dependente.idUsuario).then(async (json2) => {
        let remedios = <Remedio[]>(json2);
        for (let remedio of remedios){
          this.remedios[this.remedios.length] = remedio;
        }
      }) 
      }
    });
  }

  async fillDependentes(){
    await this.usuarioService.listarDependentes(this.usuario.idUsuario).then(async (json) => {
      this.dependentes = <Usuario[]>(json);
    });
  }



  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
