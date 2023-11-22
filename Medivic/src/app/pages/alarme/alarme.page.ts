import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from 'src/app/model/remedio';
import { RemedioService } from 'src/app/services/remedio.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarme',
  templateUrl: './alarme.page.html',
  styleUrls: ['./alarme.page.scss'],
})
export class AlarmePage implements OnInit {
  remedios: Remedio[];
  usuario: Usuario;
  usuarios: Usuario[];
  hora: string;
  idUsuario: number;
  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private horarioService: HorarioService, private toastController: ToastController, private remedioService: RemedioService, private navController: NavController) {
    this.remedios = this.remedioService.getRemedio();
    this.usuarios = this.usuarioService.getUsuarioRemedio();
    this.usuario = this.usuarioService.getUser();
    this.hora = this.horarioService.formatarDataAtual();
    this.idUsuario = this.usuario.idUsuario;
  }

  ngOnInit() {
  }

  ////////////////////////////////////////////////////////////////
  /////////////////////////PRINCIPAIS/////////////////////////////
  ////////////////////////////////////////////////////////////////

  confirmar() {
    for (let remedio of this.remedios) {
      remedio.dtNovo = this.calcularDtNovo(remedio.horarioNovo, remedio.intervalo);
      remedio.horarioNovo = this.calcularHorarioNovo(remedio.horarioNovo, remedio.intervalo);
      remedio.vezes--;
      console.log(remedio.horarioNovo);
      console.log(remedio.dtNovo);
      this.remedioService.salvar(remedio)
        .then((json) => {

          remedio = <Remedio>(json);
          console.log(remedio);
          if (remedio) {
            this.exibirMensagem('Remédio tomado');
            this.navController.navigateBack('/menu');
          } else {
            this.exibirMensagem('Erro ao salvar!')
          }
        })
        .catch((erro) => {
          this.exibirMensagem('Erro ao salvar! Erro: ' + erro['mensage']);
        });
    }
    this.remedioService.deleteRemedio();
    this.usuarioService.deleteUsuarioRemedio();
    clearTimeout(this.usuario.alarme);
  }

  adiar() {
    for (let remedio of this.remedios) {
      let tempo = 1;
      remedio.horarioNovo = this.calcularAdiar(remedio.horarioNovo, tempo);
      console.log(remedio.horarioNovo);
      // remedio.dtNovo = this.
      this.remedioService.salvar(remedio)
        .then((json) => {

          remedio = <Remedio>(json);
          console.log(remedio);
          if (remedio) {
            this.exibirMensagem('Remédio Adiado para ' + tempo + ' minuto a partir de agora');
            this.navController.navigateBack('/menu');
          } else {
            this.exibirMensagem('Erro ao salvar!')
          }
        })
        .catch((erro) => {
          this.exibirMensagem('Erro ao salvar! Erro: ' + erro['mensage']);
        });
    }
    this.remedioService.deleteRemedio();
    this.usuarioService.deleteUsuarioRemedio();
    clearTimeout(this.usuario.alarme);
  }

  ////////////////////////////////////////////////////////////////
  /////////////////////////AUXILIARES/////////////////////////////
  ////////////////////////////////////////////////////////////////

  calcularHorarioNovo(novo: string, intervalo: number) {
    let aux = parseInt(novo.split(":")[0]) + intervalo;
    let vintequatro = 0;
    if (aux > 23) {
      vintequatro = aux / 24;
      vintequatro = Math.floor(vintequatro) * 24;
    }
    console.log(vintequatro);
    let horarioNovo = aux - vintequatro;
    if (aux > 23) {
      if (horarioNovo < 10) {
        return ("0" + horarioNovo + ":" + novo.split(":")[1]);
      } else {
        return (horarioNovo + ":" + novo.split(":")[1]);
      }
    } else {
      if (aux < 10) {
        return ("0" + aux + ":" + novo.split(":")[1]);
      } else {
        return (aux + ":" + novo.split(":")[1]);
      }
    }
  }

  //fix timezone later
  calcularDtNovo(novo: string, intervalo: number) {
    let aux = parseInt(novo.split(":")[0]) + intervalo;
    let aux2 = 0;
    let date = new Date();
    
    let mes = date.getMonth() + 1;
    if (aux > 23) {
      aux2 = aux / 24;
      aux2 = Math.floor(aux2);
      //date.setDate(date.getDate() + aux2 - 1);
      date.setDate(date.getDate() + aux2);
      return date.toISOString().split("T")[0];
    }
    else {
//      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    }
  }

  calcularAdiar(novo: string, adiar: number) {
    let horarioNovo = parseInt(novo.split(":")[0]);
    let minutoNovo = adiar + parseInt(novo.split(":")[1]);
    if (minutoNovo > 59) {
      horarioNovo++;
      if (horarioNovo > 23) {
        return ("00:00")
      } else
        if (horarioNovo < 10) {
          return ("0" + horarioNovo + ":00");
        } else {
          return (horarioNovo + ":00");
        }
    } else {
      if (minutoNovo < 10) {
        return (novo.split(":")[0] + ":0" + minutoNovo);
      } else {
        return (novo.split(":")[0] + ":" + minutoNovo);
      }
    }
  }

  adjustTimeZone(hora: string){
    let date = new Date();
    if(hora.split(":")[0] == "21" || hora.split(":")[0] == "22" || hora.split(":")[0] == "23"){
      date.setHours(date.getHours()-3);
      return date;
    }else{
      return date;
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }
}
