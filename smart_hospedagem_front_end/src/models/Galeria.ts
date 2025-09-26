export class Galeria {
    id?: number | null;
    titulo: string;
    descricao: string;
    url: string;
    usuario?: number | null;

    constructor(galeria: Partial<Galeria>){
        this.id = galeria.id;
        this.titulo = galeria.titulo || '';
        this.descricao = galeria.descricao || '';
        this.url = galeria.url || '';
        this.usuario = galeria.usuario;
    }
}