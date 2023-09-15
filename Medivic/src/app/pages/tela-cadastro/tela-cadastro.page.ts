import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.page.html',
  styleUrls: ['../tela-login/tela-login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TelaCadastroPage implements OnInit {

  usuario: Usuario;
  nome!:string;
  senha!: string;
  email!: string;
  id!:string;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group(
      {
        'nome': [this.usuario.nome, Validators.compose([
          Validators.required
        ])],
        'email': [this.usuario.email, Validators.compose([
          Validators.required
        ])],
        'senha': [this.senha, Validators.compose([
          Validators.required
        ])],
      });
    }

  ngOnInit() {
  }

  async cadastro() {
    this.nome = this.formGroup.value.nome;
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;

  }



  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
