import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-login-dependente',
  templateUrl: './tela-login-dependente.page.html',
  styleUrls: ['./tela-login-dependente.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TelaLoginDependentePage implements OnInit {

  usuario: Usuario;
  codigo!: string;
  id!:string;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group(
      {
        'codigo': [this.usuario.senha, Validators.compose([
          Validators.required
        ])],
      });
    }

  ngOnInit() {
  }

  async login() {

    this.codigo = this.formGroup.value.codigo;

    await this.usuarioService.verificarLogin("dependente" + this.codigo, this.codigo).then((json) => {
      console.log(<Usuario>json)
      if (<Usuario>(json) == null) {
        this.exibirMensagem('Dados incorretos.');
      } else {
        let usuario = <Usuario>(json);
        if (usuario.isDependente == "y"){
        this.exibirMensagem('Login efetuado!');
        this.usuarioService.setUser(usuario);
        this.navController.navigateBack('/menu')
        }else{
          this.exibirMensagem('Não existe dependente com esse código.');
        }
      }
      console.log(this.codigo)
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