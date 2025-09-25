import AxiosConfiguracao from "../api/axiosConfig";
import { User } from "../models/User";


export default class UserService{
    private api: AxiosConfiguracao;

    constructor(api: AxiosConfiguracao){
        this.api = api;
    }

    async listarUsuarios(): Promise<User[]>{
        
        const { data } = await this.api.client.get<User[]>('');
        return data.map(user => new User(user));
    }

    async criarUsuario(payload: Partial<User>){
        const { data } = await this.api.client.post<User>('', payload);
        return new User(data);
    }

    async getUsuario(id: number): Promise<User>{
        const { data } = await this.api.client.get<User>('');
        return new User(data);
    }

    async atualizarUsuario(id: number , payload: Partial<User>){
        const { data } = await this.api.client.put<User>('', payload);
        return new User(data);
    }
    
}