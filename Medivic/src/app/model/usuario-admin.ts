export class UsuarioAdmin {
    idCuidador: number;
    idDependente: number;
    tipo: string;
    administrarRemedio: number;
    cadastrarRemedio: number;

    constructor(){
        this.idCuidador = 0;
        this.idDependente = 0;
        this.tipo = "";
        this.administrarRemedio = 0;
        this.cadastrarRemedio = 0;
    }
}
