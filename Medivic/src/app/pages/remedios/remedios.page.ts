import { Component, OnInit } from '@angular/core';
import { Remedio } from '../../model/remedio';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { RemedioService } from '../../services/remedio.service';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-remedios',
  templateUrl: './remedios.page.html',
  styleUrls: ['./remedios.page.scss'],
})
export class RemediosPage implements ViewWillEnter {
  finalizados: boolean = false;
  remedios: Remedio[];
  remedio: Remedio;
  usuario: Usuario;
  dependente: Usuario;
  id: number;
  userLogged: boolean = true;

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private alertController: AlertController, 
    private remedioService: RemedioService, private loadingController: LoadingController) {

    this.remedios = [];
    this.id = parseInt(this.activatedRoute.snapshot.params['idUsuario']);
    this.usuario = this.usuarioService.getUser();
    this.dependente = new Usuario();
    this.checkId(this.id);


    let usuario = this.usuarioService.getUser();
    if (usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro');
      this.navController.navigateBack('/login');
    }
    this.remedio = new Remedio();
    this.usuarioService.getDependente(this.usuario.idUsuario, this.id)
      .then((json) => {
        this.dependente = <Usuario>json;
      })

  }

  ngOnInit() {
    console.log(this.usuario.idUsuario);
    console.log(this.id);
    console.log(this.dependente.idUsuario);
  }

  async ionViewWillEnter() {
    this.carregarLista();
    console.log(this.id);
    console.log(this.userLogged)
  }

  async carregarLista() {
    this.exibirLoader();

    let usuario = this.usuarioService.getUser()

    if (!this.finalizados) {
      await
        this.remedioService.listarEmUso(this.id)
          .then((json) => {
            this.remedios = <Remedio[]>(json);
            this.remedioService.dataFormatar(this.remedios);
            this.fecharLoader();
          });
    } else {
      await
        this.remedioService.listarFinalizados(this.id)
          .then((json) => {

            this.remedios = <Remedio[]>(json);
            this.remedioService.dataFormatar(this.remedios);
            this.fecharLoader();
          });
    }
  }


  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }


  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async excluir(remedio: Remedio) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão ?',
      message: remedio.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.remedioService.excluir(remedio.idRemedio).then(() => {
              this.exibirMensagem('Excluido com sucesso!!');
              this.carregarLista();
            }).catch(() => {
              this.exibirMensagem('Erro ao excluir.');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async checkId(id: number) {
    if (id != this.usuario.idUsuario) {
      this.userLogged = false;
      this.id = id;
      this.dependente.idUsuario = id;
    } else {
      this.id = this.usuario.idUsuario;
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }


  emuso() {
    this.finalizados = false;
    this.carregarLista();

  }

  finalizado() {
    this.finalizados = true;
    this.carregarLista();
  }

}
