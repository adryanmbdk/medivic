export class Usuario {
    idUsuario: number;
    nome: string;
    email:string;
    senha:string;
    isDependente: string;
    alarme:any;

    constructor(){
        this.idUsuario = 0;
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.alarme = 0;
        this.isDependente = "";
    }
}