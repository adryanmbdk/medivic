import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.page.html',
  styleUrls: ['../tela-cadastro/tela-cadastro.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TelaCadastroPage implements OnInit {

  usuario: Usuario;
  nome!:string;
  senha!: string;
  confirmarSenha!: string;
  email!: string;
  formGroup: FormGroup;
  passwordType: string = 'password';
  passwordShow: boolean = false;
  confirmarPasswordType: string = 'password';
  confirmarPasswordShow: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
 

    this.formGroup = this.formBuilder.group(
      {
        'nome': [this.usuario.nome, Validators.compose([
          Validators.required
        ])],
        'email': [this.usuario.email, Validators.compose([
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
    let nome = this.formGroup.value.nome;
    let senha = this.formGroup.value.senha;

    this.usuario.email = email;
    this.usuario.nome = nome;
    this.usuario.senha = senha;
    this.usuario.isDependente = "n";
    //debugger
    this.usuarioService.verificarEmail(email).then((json) => {
      if (<any>(json) == true) {
        this.exibirMensagem('Esse email ja existe')
      } else {
        this.usuarioService.salvar(this.usuario).then((json) =>{
          if(json === false){
            this.exibirMensagem('Não foi possivel criar')
          }else{
            this.exibirMensagem('Usuario cadastrado');
             this.navController.navigateBack('/tela-inicial');
          }
        })
      }
    })
    
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