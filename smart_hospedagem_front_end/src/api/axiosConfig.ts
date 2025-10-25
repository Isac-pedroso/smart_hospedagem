import axios, { type AxiosInstance } from "axios";


export default class AxiosConfiguracao{
    private axios: AxiosInstance;

    constructor(url = ''){
        this.axios = axios.create({baseURL: url});
    }

    setBearer(token: string){
        if(token){
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(`Bearer ${token}`);
        }else{
            delete this.axios.defaults.headers.common['Authorization'];
        }
    }

    get client(){
        return this.axios;
    }
}