import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
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

  async cadastrar() {
    let email = this.formGroup.value.email;
    let nome = this.formGroup.value.nome;
    let senha = this.formGroup.value.senha;

    this.usuario.email = email;
    this.usuario.nome = nome;
    this.usuario.senha = senha;
    //debugger
    this.usuarioService.verificarEmail(email).then((json) => {
      let valor = <number>(json);;
      if (valor < 400) {
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

}
