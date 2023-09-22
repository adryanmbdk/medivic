import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private tarefas: Tarefa[];
  public appPages = [
    { title: 'Tarefas', url: '/tarefa', icon: 'alarm', color: "dark" },
  ];
  constructor(private tarefaService: TarefaService) {
    this.tarefas = [];
  }
  ngOnInit() {
    let numero = setInterval(() => {
      console.log("procurando por tarefa");
      this.verificarTarefas();
    }, 6000);
  }
  async verificarTarefas() {
    this.tarefas = this.tarefaService.listar();
    let dataAtual = new Date();
    let minutoAtual = dataAtual.getMinutes();
    this.tarefas.forEach((tarefa) => {
      if ((tarefa.minuto == minutoAtual) && (tarefa.situacao == false)) {
        tarefa.situacao = true;
        tarefa.numero = setInterval(() => {
          let audio = new Audio('assets/beep.mp3');
          console.log(tarefa.descricao);
          audio.play();
        }, 3000);
        this.tarefaService.salvar(tarefa);
      }
    });
  }
}