import axios from "axios";



export const uploadFoto = async (id_quarto: number, arquivo: File, token: string | null) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const formData = new FormData();
        formData.append("file", arquivo);

        const response = await axios.post(`http://localhost:8080/fotosQuarto/upload/${id_quarto}`, formData, config)
        console.log(response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return {success: true, message: response.data.message};
    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response.data.message || error };
        } else {
            return { success: false, message: error.message || error };
        }
    }
} 


export const trazFotosQuarto = async (id_quarto: number, token: string | null) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(`http://localhost:8080/fotosQuarto/trazFotosQuarto/${id_quarto}`, config)
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        const fotosMapeadas = response.data.data.fotos.map((foto: any) => {
            const url = foto.caminhoFoto;
            const urlPadronizada = url.replace(/\\/g, '/');
            const ultimaBarra = urlPadronizada.lastIndexOf("/");
            const nomeArquivo = urlPadronizada.substring(ultimaBarra+1)

            return {
                ...foto,
                caminhoFoto: `http://localhost:8080/uploads/${nomeArquivo}`
            }
        })

        return {success: true, message: response.data.message, data: {fotos: fotosMapeadas}};
    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response.data.message || error };
        } else {
            return { success: false, message: error.message || error };
        }
    }
} 