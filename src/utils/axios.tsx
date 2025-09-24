import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


// GET

export const getResponse = async (endpoint: string) => {
    try{
        const response = await api.get(endpoint);
        return response.data;
    }catch(error){
        throw error;
    }
} 

// POST

export const postResponse = async (endpoint: string, data: Record<string, any>) => {
    try{
        const response = await api.post(endpoint, data)
        return response;
    }catch(error: any){
        console.log(error.response.data)
        throw error.response.data;
    }
};


// PUT

export const putResponse = async (endpoint: string, data: Record<string, any>) => {
    try{
        const response = await api.put(endpoint, data);
        return response.data
    }catch(error){
        throw error;
    }
};


// DELETE

export const deleteResponse = async (endpoint: string) => {
    try{
        const response = await api.delete(endpoint, data);
        return response.data
    }catch(error){
        throw error;
    }
};