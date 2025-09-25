export class Galeria {
    id?: number;
    titulo: string;
    descricao: string;
    url: string;

    constructor(galeria: Partial<Galeria>){
        this.id = galeria.id;
        this.titulo = galeria.titulo || '';
        this.descricao = galeria.descricao || '';
        this.url = galeria.url || '';
    }
}