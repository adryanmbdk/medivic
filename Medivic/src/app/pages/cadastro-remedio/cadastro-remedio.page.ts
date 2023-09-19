import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from 'src/app/model/remedio';
import { Usuario } from 'src/app/model/usuario';
import { RemedioService } from 'src/app/services/remedio.service';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-remedio',
  templateUrl: './cadastro-remedio.page.html',
  styleUrls: ['./cadastro-remedio.page.scss'],
})
export class CadastroRemedioPage implements OnInit {

  remedio: Remedio;
  formGroup: FormGroup;
  usuario: Usuario;
  location: any;
  keys!: string[]; 

  constructor( private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private remedioService: RemedioService, private loadingController: LoadingController, private alertController: AlertController) { 

    let usuario = this.usuarioService.getUser()
    if(usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro')
      this.navController.navigateBack('/login');
    }

    this.remedio = new Remedio();
    this.usuario = usuarioService.getUser();

    this.formGroup = this.formBuilder.group(
      {
        'nome': [this.remedio.nome, Validators.compose([
          Validators.required
        ])],
        'descricao': [this.remedio.descricao, Validators.compose([
          Validators.required
        ])],
        'unidade': [this.remedio.unidade, Validators.compose([
          Validators.required
        ])],
        'quantDias': [this.remedio.quantDias, Validators.compose([
          Validators.required
        ])],
        'idUsuario': [this.remedio.idUsuario, Validators.compose([
          Validators.required
        ])],
        'intervalo': [this.remedio.intervalo, Validators.compose([
          Validators.required
        ])],
        'dosagem': [this.remedio.dosagem, Validators.compose([
          Validators.required
        ])],
        'dtInicio': [this.remedio.dtInicio, Validators.compose([
          Validators.required
        ])],
        'dtFim': [this.remedio.dtFim, Validators.compose([
          Validators.required
        ])],
        'horarioInicio': [this.remedio.horarioInicio, Validators.compose([
          Validators.required
        ])],
      }
    )


    let id = this.activatedRoute.snapshot.params['idRemedio'];
    if (id != null) {
      this.remedioService.buscarPorId(parseInt(id)).then((json) => {
        this.remedio = <Remedio>(json);
        this.formGroup.get('nome')?.setValue(this.remedio.nome);
        this.formGroup.get('descricao')?.setValue(this.remedio.descricao);
        this.formGroup.get('unidade')?.setValue(this.remedio.unidade);
        this.formGroup.get('quantDias')?.setValue(this.remedio.quantDias);
        this.formGroup.get('intervalo')?.setValue(this.remedio.intervalo);
        this.formGroup.get('dosagem')?.setValue(this.remedio.dosagem);
        this.formGroup.get('dtInicio')?.setValue(this.remedio.dtInicio);
        this.formGroup.get('dtFim')?.setValue(this.remedio.dtFim);
        this.formGroup.get('horarioInicio')?.setValue(this.remedio.horarioInicio);

        this.remedio.idUsuario = this.usuario.idUsuario;
      });
    }else{
      let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.remedio.idUsuario = usuario.idUsuario;
    }
  }


   ngOnInit() {

  }

  verificaRemedio() {
    if (this.remedio.idRemedio === 0) {
      return false;
    }
    return true;
  }

  salvar() {
  
    this.remedio.nome = this.formGroup.value.nome;
    this.remedio.descricao = this.formGroup.value.descricao;
    this.remedio.unidade = this.formGroup.value.unidade;
    this.remedio.quantDias = this.formGroup.value.quantDias;
    this.remedio.intervalo = this.formGroup.value.intervalo;
    this.remedio.dosagem = this.formGroup.value.dosagem;
    this.remedio.dtInicio = this.formGroup.value.dtInicio;
    this.remedio.dtFim = this.formGroup.value.dtFim;
    this.remedio.horarioInicio = this.formGroup.value.horarioInicio;


    let usuario = this.usuarioService.getUser();
    this.remedio.idUsuario = usuario.idUsuario;
        
        this.remedioService.salvar(this.remedio)
          .then((json) => {
            
            this.remedio = <Remedio>(json);
            
            if (this.remedio) {
              this.exibirMensagem('Registro salvo com sucesso!');
              this.navController.navigateBack('/remedios');
            } else {
              this.exibirMensagem('Erro ao salvar o registro!')
            }
          })
          .catch((erro) => {
            this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
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


