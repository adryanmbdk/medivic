import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor() { }

  formatarDataAtual(){
    let now = new Date();
    let hora = now.getHours();
    let minuto = now.getMinutes();
    if(hora < 10 && minuto > 10){
      return "0" + hora + ":" + minuto;
    }else if (minuto < 10 && hora > 10){
      return hora + ":0" + minuto;
    }else if (hora < 10 && minuto < 10){
      return "0" + hora + ":0" + minuto;
    }else{
      return hora + ":" + minuto;
    }
  }
}
