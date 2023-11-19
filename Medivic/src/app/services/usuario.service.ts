import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { UsuarioAdmin } from '../model/usuario-admin';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/usuario';
  urlCuidador= (idCuidador: number) =>
    `http://localhost:8087/api/v1/cuidador/${idCuidador}/dependente`;

  constructor(private httpClient: HttpClient) { }
  
  async salvar(usuario: Usuario) {
    if(usuario.idUsuario === 0){
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
  
  async listarDependentes(idCuidador: number){
    let urlAuxiliar = this.urlCuidador(idCuidador);
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async deleteDependente(idCuidador: number, idDependente: number){
    let urlAuxiliar = this.urlCuidador(idCuidador) + "/" + idDependente;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async saveRelationship(usuarioAdmin: UsuarioAdmin) {
      return await this.httpClient.post(this.urlCuidador(usuarioAdmin.idCuidador), 
      {idCuidador: usuarioAdmin.idCuidador, idUsuario: usuarioAdmin.idDependente, tipo: usuarioAdmin.tipo, administrarRemedio: 
        usuarioAdmin.administrarRemedio, cadastrarRemedio: usuarioAdmin.cadastrarRemedio}, 
      this.httpHeaders).toPromise();
  }

  setUser(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUser(){
    let usuario = JSON.parse(localStorage.getItem('usuario') || '[]');
    return usuario;
  }

  logout(){
    localStorage.removeItem('usuario');
  }
}
 