import axios, {AxiosInstance} from "axios";

export class HttpClient {
    private static instance: HttpClient;
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        });
    }

    public get client(): AxiosInstance {
        return this.axiosInstance;
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }

        return HttpClient.instance;
    }
}
