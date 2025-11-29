import axios from "axios";
import type { QuartoRequestDto, QuartoResponseDto } from "../types/quarto";




export async function Cadastrar(request: QuartoRequestDto, token: string){
    try{

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const response = await axios.post("http://localhost:8080/quarto/cadastrar", request, config)
        
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return { success: true, message: response.data.message, data: response.data.data};
    }catch(error: any){
        if (error.response) {
            return { success: false, message: error.response?.data?.message || error }
        } else {
            return { success: false, message: error.message || error }
        }
    }
};


export async function trazQuartosPousadaLogada(token: string){
    try{

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log("AQUI")

        const response = await axios.get("http://localhost:8080/quarto/trazQuartosPousadaLogada", config);
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return {success: true, message: response.data.message, data: response.data.data.quartos};
    }catch(error: any){
        if (error.response) {
            return { success: false, message: error.response?.data?.message || error }
        } else {
            return { success: false, message: error.message || error }
        }
    }
}


export async function deletarQuarto(id_quarto: number, token: string){
    try{

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(id_quarto)

        const response = await axios.delete(`http://localhost:8080/quarto/deletarQuarto/${id_quarto}`, config);
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return {success: true, message: response.data.message, data: response.data.data.quartos};
    }catch(error: any){
        if (error.response) {
            return { success: false, message: error.response?.data?.message || error }
        } else {
            return { success: false, message: error.message || error }
        }
    }
}