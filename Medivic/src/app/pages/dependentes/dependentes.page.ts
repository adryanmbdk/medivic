import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioAdmin } from 'src/app/model/usuario-admin';
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
  nome: string;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController) {
    this.dependentes = [];
    this.nome = "";
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

  async showInput() {

    const input = await this.alertController.create({
      header: 'Adicionar novo dependente',
      subHeader: 'Insira o nome:',
      inputs: [
        {
          name: 'nameDependente',
          type: 'text',
          min: 1,
          max: 60,
          placeholder: 'Nome',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Adicionar',
          handler: (data) => {
            if (data.nameDependente.length > 0) {
              console.log("ok");
              this.addDependente(data.nameDependente);
              return true;
            } else {
              this.exibirMensagem("Nome inválido");
              return false;
            }
          }
        }
      ]
    });

    await input.present();
  }

  async addDependente(name: string) {
    this.dependente.nome = name;
    this.dependente.isDependente = "y";

    this.usuarioService.salvar(this.dependente).then((json) => {
      if (json === false) {
        this.exibirMensagem('Não foi possivel criar')
      } else {
        this.exibirMensagem('Dependente Adicionado');
        let dependente = <Usuario>json;
        let cuidadorDependente = new UsuarioAdmin;

        cuidadorDependente.idCuidador = this.usuario.idUsuario;
        console.log(dependente.idUsuario);
        cuidadorDependente.idDependente = dependente.idUsuario;
        cuidadorDependente.tipo = 'A';
        cuidadorDependente.administrarRemedio = 1;
        cuidadorDependente.cadastrarRemedio = 1;

        this.usuarioService.saveRelationship(cuidadorDependente);
        this.carregarLista();
      }
    });
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
