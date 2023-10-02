import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Remedio } from '../../model/remedio';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { RemedioService } from '../../services/remedio.service';

@Component({
  selector: 'app-cadastro-remedio',
  templateUrl: './cadastro-remedio.page.html',
  styleUrls: ['./cadastro-remedio.page.scss'],
})
export class CadastroRemedioPage implements OnInit {

  remedio: Remedio;
  formGroup: FormGroup;
  usuario: Usuario;
  horarios!: string[];
  criando!: boolean;

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private remedioService: RemedioService, private loadingController: LoadingController, private alertController: AlertController) {
    let usuario = this.usuarioService.getUser()
    if (usuario.idUsuario === undefined) {
      this.exibirMensagem('Faça login primeiro')
      this.navController.navigateBack('/login');
    }

    this.remedio = new Remedio();
    this.usuario = usuarioService.getUser();
    
    console.log(this.remedio.horarioNovo);
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
        'dtNovo': { value: this.remedio.dtNovo, disabled: false },
        'horarioNovo': { value: this.remedio.horarioNovo, disabled: false },
        'horarioInicio': ["", Validators.compose([
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
        this.formGroup.get('dtNovo')?.setValue(this.remedio.dtNovo);
        this.formGroup.get('horarioNovo')?.setValue(this.remedio.horarioNovo);
        this.formGroup.get('horarioInicio')?.setValue(this.remedio.horarioInicio);

        this.remedio.idUsuario = this.usuario.idUsuario;
      });
    } else {
      let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.remedio.idUsuario = usuario.idUsuario;
    }
  }


  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['idRemedio'];
    if (id === undefined) {
      this.criando = true;
    }else{
      this.criando = false;
    }
  }



  // calcularDatas(){
  //   this.horarios = [];
  //   let vezes = this.calcularQntDeVezes();
  //   let horaInicio = parseInt(this.formGroup.value.horarioInicio.split(":")[0]);
  //   let hora = horaInicio;
  //   this.horarios[0] = this.formGroup.value.horarioInicio;
  //   for(var i = 1; i < vezes; i++){
  //     this.horarios[i] = this.somarDatas(this.formGroup.value.intervalo, hora) + ":" + this.formGroup.value.horarioInicio.split(":")[1];
  //   }
  //   return this.horarios;
  // }

  salvar() {
    if (this.remedio.idRemedio === 0) {
      this.remedio.nome = this.formGroup.value.nome;
      this.remedio.descricao = this.formGroup.value.descricao;
      this.remedio.unidade = this.formGroup.value.unidade;
      this.remedio.quantDias = this.formGroup.value.quantDias;
      this.remedio.intervalo = this.formGroup.value.intervalo;
      this.remedio.dosagem = this.formGroup.value.dosagem;
      this.remedio.dtInicio = this.formGroup.value.dtInicio;
      this.remedio.dtNovo = this.formGroup.value.dtInicio;
      this.remedio.horarioInicio = this.formGroup.value.horarioInicio;
      this.remedio.horarioNovo = this.formGroup.value.horarioInicio;
      this.remedio.vezes = this.calcularQntDeVezes();
      console.log("Vezes:" + this.remedio.vezes);
      console.log("Remédio foi Cadastrado");
    } else {
      if(this.remedio.horarioInicio != this.formGroup.value.horarioInicio) {
        this.remedio.horarioInicio = this.formGroup.value.horarioInicio;
        this.remedio.horarioNovo = this.formGroup.value.horarioInicio;
        console.log("Mudança no horário")
        console.log("Vezes:" + this.remedio.vezes);
      }
      if(this.remedio.dtInicio != this.formGroup.value.dtInicio) {
        this.remedio.dtInicio = this.formGroup.value.dtInicio;
        this.remedio.dtNovo = this.formGroup.value.dtInicio;
        console.log("Mudança na data")
        console.log("Vezes:" + this.remedio.vezes);
      }
      if(this.remedio.intervalo != this.formGroup.value.intervalo || this.remedio.quantDias != this.formGroup.value.quantDias){
        this.remedio.quantDias = this.formGroup.value.quantDias;
        this.remedio.intervalo = this.formGroup.value.intervalo;
        console.log("Mudança no intervalo ou na quantidade de dias")
        this.remedio.vezes = this.calcularQntDeVezes();
        console.log("Vezes:" + this.remedio.vezes);
      }
      if(this.remedio.nome != this.formGroup.value.nome || this.remedio.descricao != this.formGroup.value.descricao || this.remedio.unidade != this.formGroup.value.unidade ||
        this.remedio.dosagem != this.formGroup.value.dosagem){
          this.remedio.nome = this.formGroup.value.nome;
          this.remedio.descricao = this.formGroup.value.descricao;
          this.remedio.unidade = this.formGroup.value.unidade;
          this.remedio.dosagem = this.formGroup.value.dosagem;
          console.log("Mudança no nome,dosagem,unidade,descricao")
          console.log("Vezes:" + this.remedio.vezes);
        }
    }
    // this.remedio.horarios = this.calcularDatas(); 


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
    console.log(parseInt(this.formGroup.value.horarioInicio));
    console.log(parseInt(this.formGroup.value.horarioInicio.split(":")[1]));
  }

  calcularQntDeVezes() {
    let vezes = (this.formGroup.value.quantDias * 24) / this.formGroup.value.intervalo;
    vezes = Math.ceil(vezes);
    return vezes;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }


}


