import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.page.html',
  styleUrls: ['./dependentes.page.scss'],
})
export class DependentesPage implements OnInit {
  dependentes: Usuario[];
  dependente: Usuario;
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController) {
    this.dependentes = [];

    let usuario = this.usuarioService.getUser();
    if (usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro')
      this.navController.navigateBack('/login');
    }

    this.dependente = new Usuario();
    this.usuario = usuarioService.getUser();

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    await this.usuarioService.listarDependentes(this.usuario.idUsuario)
      .then((json) => {
        this.dependentes = <Usuario[]>(json);
      });

    this.fecharLoader();

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

  async excluir(dependente: Usuario) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão ?',
      message: dependente.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.usuarioService.deleteDependente(this.usuario.idUsuario, dependente.idUsuario).then(() => {
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

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }


}
