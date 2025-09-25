import { Galeria } from "../models/Galeria";
import AxiosConfiguracao from "../api/axiosConfig";

export default class GaleriaService{
    private api: AxiosConfiguracao;

    constructor(api: AxiosConfiguracao){
        this.api = api;
    }

    async listar(): Promise<Galeria[]>{
        const { data } = await this.api.client.get<Galeria[]>("galeriaAdmin/listar")
        return data;
    }

    async cadastrar(galeria: Galeria){
        const { data } = await this.api.client.post("galeriaAdmin/listar", galeria);
        return data;
    }
}