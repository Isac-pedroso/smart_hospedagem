import { Galeria } from "../models/Galeria";
import AxiosConfiguracao from "../api/axiosConfig";
import TokenStorage from "../api/TokenStorage";

export default class GaleriaService{
    private api: AxiosConfiguracao;

    constructor(api: AxiosConfiguracao){
        this.api = api;
        const token = TokenStorage.getToken();
        console.log(token)
        if(token) this.api.setBearer(token);
    }

    async listar(): Promise<Galeria[]>{
        const { data } = await this.api.client.get<Galeria[]>("galeriaAdmin/listar")
        return data;
    }

    async listarPorUsuario(id: number): Promise<Galeria[]>{
        const { data } = await this.api.client.get<Galeria[]>(`galeriaAdmin/listarPorUsuario/${id}`)
        console.log(data);
        return data;
    }

    async cadastrar(galeria: Galeria){
        const { data } = await this.api.client.post("galeriaAdmin/cadastrar", galeria);
        return data;
    }
}