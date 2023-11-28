import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from 'src/app/model/remedio';
import { Usuario } from 'src/app/model/usuario';
import { RemedioService } from 'src/app/services/remedio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-remedios-dependente',
  templateUrl: './remedios-dependente.page.html',
  styleUrls: ['../remedios/remedios.page.scss'],
})
export class RemediosDependentePage implements OnInit {
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
