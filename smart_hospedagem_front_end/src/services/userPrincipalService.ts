import axios from "axios";
import type { UserPrincipalResponse } from "../types/UserPrincipal";
import { store } from "../store/store";


export async function getDadosUsuarioPrincipal(token: string): Promise<UserPrincipalResponse>{
    try{
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        console.log(token)
        console.log(config)
        
        const response = await axios.get<UserPrincipalResponse>("http://localhost:8080/usuarioPrincipal/getDadosUsuarioPrincipal", config);

        if(response.status !== 200){
            throw new Error("Ocorreu um problema ao trazer os dados do usuario principal");
        }

        return response.data;
    }catch(error){
        return {email: "", nome: "", role: ""};
    }
}