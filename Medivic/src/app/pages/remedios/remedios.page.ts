import { Component, OnInit } from '@angular/core';
import { Remedio } from 'src/app/model/remedio';
import { RemedioService } from 'src/app/services/remedio.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-remedios',
  templateUrl: './remedios.page.html',
  styleUrls: ['./remedios.page.scss'],
})
export class RemediosPage implements OnInit {

  remedios: Remedio[];
  remedio: Remedio;
  usuario: Usuario;

  constructor(private usuarioService:UsuarioService, private toastController: ToastController, private navController: NavController, private alertController: AlertController, private remedioService: RemedioService, private loadingController: LoadingController) { 
    this.remedios = [];

    let usuario = this.usuarioService.getUser();
    if(usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro')
      this.navController.navigateBack('/login');
    }

    this.remedios = [];
    this.remedio = new Remedio()
    this.usuario = usuarioService.getUser();

  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.carregarLista();
  }  

  async carregarLista(){
    this.exibirLoader();
    
    let usuario = this.usuarioService.getUser()
    
    await this.remedioService.listar(usuario.idUsuario).then(async (json)=>{
      
      this.remedios = <Remedio[]> (json);
      this.fecharLoader();
  });
  }


  exibirLoader(){
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res)=>{
      res.present();
    })
  }
  

  fecharLoader(){
    setTimeout(()=>{
      this.loadingController.dismiss().then(()=>{
      }).catch((erro)=>{
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async excluir(remedio: Remedio){
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
              this.remedioService.excluir(remedio.idRemedio).then(()=>{
                this.exibirMensagem('Excluido com sucesso!!');
                this.carregarLista();
              }).catch(()=>{
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
