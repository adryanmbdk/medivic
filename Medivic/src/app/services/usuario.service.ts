import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/usuario';

  constructor(private httpClient: HttpClient) { }
  
  async salvar(usuario: Usuario) {
    if(usuario.id === 0){
      return await this.httpClient.post(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
    }else{
      return await this.httpClient.put(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number){
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar(){
    return await this.httpClient.get(this.url).toPromise();
  }

  async verificarEmail(email:string){
    let urlAuxiliar = this.url + "/email/" + email + "/exists";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }


  async verificarLogin(email:string, senha: string){
    let urlAuxiliar = this.url + "/" + email + "/" + senha + "/authenticate";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
}
 