import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/Login";


export async function login(login: LoginRequest): Promise<LoginResponse> {
    try{
        const response = await axios.post<LoginResponse>("http://localhost:8080/auth/login", login);
        
        if(response.status !== 200){
            throw new Error("Login invalido!");
        }

        return response.data;
    }catch(error: any){
        console.error("Erro no login: ", error.response?.data || error.message);
        return {token: ""};
    }
}