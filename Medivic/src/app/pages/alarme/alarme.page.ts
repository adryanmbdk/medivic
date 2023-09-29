import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from 'src/app/model/remedio';
import { RemedioService } from 'src/app/services/remedio.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alarme',
  templateUrl: './alarme.page.html',
  styleUrls: ['./alarme.page.scss'],
})
export class AlarmePage implements OnInit {
  remedios: Remedio[];
  usuario: Usuario;
  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private remedioService: RemedioService, private navController: NavController) { 
    this.remedios = this.remedioService.getRemedio();
    this.usuario = this.usuarioService.getUser()
  }

  ngOnInit() {
  }

  confirmar(){
    for (let remedio of this.remedios){
      remedio.horarioNovo = this.calcularHorarioNovo(remedio.horarioNovo, remedio.intervalo);
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
    clearTimeout(this.usuario.alarme);
  }

  calcularHorarioNovo(novo:string, intervalo:number) {
    let aux = parseInt(novo.split(":")[0]) + intervalo;
    let vintequatro = 0;
    if (aux > 23){
    vintequatro = aux/24;
    vintequatro = Math.ceil(vintequatro) * 24;
    } 
    let horarioNovo = aux - vintequatro;
    if ((parseInt(novo.split(":")[0]) + intervalo) > 23){
      if(horarioNovo < 10){
      return ("0" + horarioNovo+":"+novo.split(":")[1]);
      }else{
        return(horarioNovo+":"+novo.split(":")[1]);
      }
    }else{
      if(aux < 10){
        return ("0" + aux+":"+novo.split(":")[1]);
        }else{
          return(aux+":"+novo.split(":")[1]);
        }
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
