

export class User {

    id?: number;
    nome: string;
    email: string;
    role: string;


    constructor(usuario: Partial<User>){
        this.id = usuario.id;
        this.nome = usuario.nome || '';
        this.email = usuario.email || '';
        this.role = usuario.role || '';
    }
}