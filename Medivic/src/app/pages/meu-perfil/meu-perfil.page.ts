import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})
export class MeuPerfilPage implements OnInit {
  passwordType: string = 'password';
  passwordShow: boolean = false;
  formGroup: FormGroup;
  usuario: Usuario;

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private loadingController: LoadingController) { 
    this.usuario = this.usuarioService.getUser();
    if(this.usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro')
      this.navController.navigateBack('/login');
    }
    //this.usuario = new Usuario();
    
   

    this.formGroup = this.formBuilder.group(
      {
        'nome':{value:this.usuario.nome, disabled: false},
        'email':{value:this.usuario.email, disabled: true},
        'senha':{value:this.usuario.senha, disabled: false}
      }
    )
  }

  async salvar() {
    let nome = this.formGroup.value.nome;
    let email = this.usuario.email;
    let senha = this.formGroup.value.senha;

    this.usuario.nome = nome;
    this.usuario.email = email;
    this.usuario.senha = senha;

    const alert = await this.alertController.create({
      header: 'Confirmar alterações?',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler:() => {
            this.usuarioService.salvar(this.usuario).then((json) => {
              if(json === false){
                this.exibirMensagem('Não foi possivel alterar os dados')
              }else{
                this.usuarioService.setUser(this.usuario);
                this.exibirMensagem('Dados alterados com sucesso');
              }
            })
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

  ngOnInit() {
  }

  public togglePassword(){
    if(this.passwordShow){
      this.passwordShow = false;
      this.passwordType ='password';
  } else {
    this.passwordShow = true;
    this.passwordType = 'text';
  }
  }
}
