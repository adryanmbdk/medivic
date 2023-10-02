import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Remedio } from '../model/remedio';

@Injectable({
  providedIn: 'root'
})
export class RemedioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/remedio';
  remedios: Remedio[];

  constructor(private httpClient: HttpClient) { 
    this.remedios = [];
  }
  async salvar(remedio: Remedio) {
   
    if(remedio.idRemedio === 0){
      return await this.httpClient.post(this.url, JSON.stringify(remedio), this.httpHeaders).toPromise();
    }else{
      return await this.httpClient.put(this.url, JSON.stringify(remedio), this.httpHeaders).toPromise();
    }
  }
  
  async excluir(id: number){
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar(idUsuario: number){
    let urlAuxiliar = this.url + "/usuario" + "/"+ idUsuario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarEmUso(idUsuario: number){
    let urlAuxiliar = this.url + "/emuso/usuario" + "/"+ idUsuario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarFinalizados(idUsuario: number){
    let urlAuxiliar = this.url + "/finalizados/usuario" + "/"+ idUsuario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarTodos(){
    debugger
    let urlAuxiliar = this.url + "/";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorId(id: number){
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async verificarUsuario(idUsuario:number){
    let urlAuxiliar = this.url + "/" + idUsuario + "/usuario";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  addRemedio(remedio: Remedio){
    this.remedios.push(remedio);
  }

  deleteRemedio(){
    this.remedios = [];
  }

  getRemedio(){
    return this.remedios;
  }

  somarDatas(intervalo:number, hora:number){
    let result = hora+intervalo;
    if(result > 23){
      result = (hora+intervalo) - 24;
      return result.toString();
    }else{
    return result.toString();
    }
  }

  dataFormatar(remedios: Remedio[]){
    for (let i = 0; i < remedios.length; i++) {
      let dataSplit = remedios[i].dtNovo.split("-");
      remedios[i].dtNovo = dataSplit[2] + "/" + dataSplit[1] + "/" + dataSplit[0];
    }
  }

}
