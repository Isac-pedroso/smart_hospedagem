const TOKEN = 'app_tokne_v1';

export default class TokenStorage{
    static getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    static setToken(token: string){
        localStorage.setItem(TOKEN,token);
    }

    static limparToken(){
        localStorage.removeItem(TOKEN);
    }
}
