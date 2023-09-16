import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.page.html',
  styleUrls: ['./tela-login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TelaLoginPage implements OnInit {

  usuario: Usuario;
  senha!: string;
  email!: string;
  id!:string;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group(
      {
        'email': [this.usuario.email, Validators.compose([
          Validators.required,
          Validators.email
        ])],
        'senha': [this.usuario.senha, Validators.compose([
          Validators.required
        ])],
      });
    }

  ngOnInit() {
  }

  async login() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;

    await this.usuarioService.verificarLogin(this.email, this.senha).then((json) => {
      if (<Usuario>(json) == null) {
        this.exibirMensagem('Dados incorretos.');
      } else {
        let usuario = <Usuario>(json);
        this.exibirMensagem('Login efetuado!');
        this.usuarioService.setUser(usuario);
        this.navController.navigateBack('/menu')
      }
    });
  }



  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
