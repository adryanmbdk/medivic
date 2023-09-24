export class Remedio {
    idRemedio:number;
    nome: string;
    idUsuario: number;
    descricao: string;
    unidade: string;
    quantDias: number;
    intervalo: number;
    dosagem: number;
    dtInicio: string;
    dtFim: string;
    horarioInicio: string;
    horarios: string[];

    constructor(){
        this.idRemedio = 0;
        this.nome = "";
        this.idUsuario = 0;
        this.descricao = "";
        this.unidade = "";
        this.quantDias = 0;
        this.intervalo = 0;
        this.dosagem = 0;
        this.dtInicio = "";
        this.dtFim = "";
        this.horarioInicio = "";
        this.horarios = [];
    }
}
