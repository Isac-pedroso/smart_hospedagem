import axios from "axios";


export async function listarPousadas(){

    try{
        const response = await axios.get("http://localhost:8080/pousada/listarPousadas");
        console.log(response)
        
        return {success: true, message: response.data.message, data: response.data.data.pousadas};
    }catch(error: any){
        if(error.response){
            return {success: false, message: error.response.data.message || error};
        }else{
            return {success: false, message: error.message || error};
        }
    }
}

