import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-dependente',
  templateUrl: './cadastro-dependente.page.html',
  styleUrls: ['./cadastro-dependente.page.scss'],
})
export class CadastroDependentePage implements OnInit {
  dependente: Usuario;
  usuario: Usuario;
  id: number;
  formGroup: FormGroup;
  passwordType: string = 'password';
  passwordShow: boolean = false;
  confirmarPasswordType: string = 'password';
  confirmarPasswordShow: boolean = false;
  senha: string;
  confirmarSenha: string;

  constructor(private usuarioService: UsuarioService, private alertController: AlertController ,private toastController: ToastController, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController) { 
    this.usuario = this.usuarioService.getUser(); 
    this.id = parseInt(this.activatedRoute.snapshot.params['idUsuario']);
    this.dependente = new Usuario();
    this.confirmarSenha = "";
    this.senha = "";
    

    this.usuarioService.getDependente(this.usuario.idUsuario, this.id)
    .then((json) => {
      this.dependente = <Usuario>json;
    });

    this.formGroup = this.formBuilder.group(
      {
        'email': [this.dependente.email, Validators.compose([
          Validators.email,
          Validators.required
        ])],
        'senha': [this.senha, Validators.compose([
          Validators.required
        ])],
        'confirmarSenha': [this.confirmarSenha, Validators.compose([
          Validators.required
        ])],
      });
    }

  ngOnInit() {
  }

  async cadastrar() {
    let email = this.formGroup.value.email;
    let senha = this.formGroup.value.senha;

    this.dependente.email = email;
    this.dependente.senha = senha;
    this.dependente.isDependente = "n";
    //debugger
      const alert = await this.alertController.create({
        header: 'Aviso \t ',
        message:'Ao adicionar dados à um dependente, ele passará a ser um usuário. Essa ação é irreversível.',
        cssClass: 'meu-perfil-alert',
        buttons: [
          {
            text: 'Cancelar'
          }, {
            text: 'OK',
            cssClass: 'danger',
            handler:() => {
              this.usuarioService.verificarEmail(email).then((json) => {
                if (<any>(json) == true) {
                  this.exibirMensagem('Esse email ja existe')
                } else {
                  this.usuarioService.salvar(this.dependente).then((json) =>{
                    if(json === false){
                      this.exibirMensagem('Não foi possivel criar')
                    }else{
                      this.exibirMensagem('Usuario cadastrado');
                       this.navController.navigateBack('/dependentes');
                    }
                  })
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

  public togglePassword(){
    if(this.passwordShow){
      this.passwordShow = false;
      this.passwordType ='password';
  } else {
    this.passwordShow = true;
    this.passwordType = 'text';
  }
}

public toggleConfirmarPassword(){
  if(this.confirmarPasswordShow){
    this.confirmarPasswordShow = false;
    this.confirmarPasswordType ='password';
} else {
  this.confirmarPasswordShow = true;
  this.confirmarPasswordType = 'text';
}
}

verifyPasswords() {
  let passwordVerify = this.formGroup.get('senha');
  let confirmPasswordVerify = this.formGroup.get('confirmarSenha');
  if (passwordVerify?.value === '' || confirmPasswordVerify?.value === '') {
    return null;
  }
  if (passwordVerify && confirmPasswordVerify) {
    let password = passwordVerify.value;
    let confirmPassword = confirmPasswordVerify.value;

    return password === confirmPassword ? null : true
  }

  return true;
}

isValid(): boolean {
  const passwordsMatch = this.verifyPasswords();
  return this.formGroup.valid && !passwordsMatch;
}

}
