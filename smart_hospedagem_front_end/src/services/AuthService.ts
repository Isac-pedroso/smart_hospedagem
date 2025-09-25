import AxiosConfiguracao from '../api/axiosConfig';
import TokenStorage from '../api/TokenStorage';

export interface AuthResponse{token: string};

export default class AuthService{
    private api: AxiosConfiguracao;

    constructor(api: AxiosConfiguracao){
        this.api = api;
        const token = TokenStorage.getToken();
        if(token) this.api.setBearer(token);
    }

    async login(email: string, senha: string){
        try{
            const { data } = await this.api.client.post<AuthResponse>('auth/login', { email, senha });
            console.log(data);
            TokenStorage.setToken(data.token);
            this.api.setBearer(data.token)
            
            return data.token;
        }catch(error: any){
            console.error("Deu problemaaa", error.response?.data || error.message);
            throw error;
        }
    }

    logout(){
        TokenStorage.limparToken();
        this.api.setBearer('undefined');
    }

    getToken(){
        return TokenStorage.getToken();
    }
}