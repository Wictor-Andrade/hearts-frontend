import axios from 'axios';

export const useAxios = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida!');
    }

    const instance = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
    });

    return instance;
};
