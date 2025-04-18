import {CreateRoomDto} from "@/dtos/create-room.dto";
import {Room} from "@/entities/rooms";
import {HttpClient} from "@/utils/HttpClient";

export class RoomsApi {
    private readonly httpClient: HttpClient;
    private readonly baseUrl = "/rooms";

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async createRoom(data: CreateRoomDto): Promise<Room> {
        const { client } = this.httpClient;
        const response = await client.post<Room>(`${this.baseUrl}/create`, data);
        return response.data;
    }

    async findRoom(roomName: string): Promise<Room> {
        const { client } = this.httpClient;
        const response = await client.get<Room>(`${this.baseUrl}/find/${roomName}`);
        return response.data;
    }

    async validateAdmin(name: string, password: string): Promise<boolean> {
        const { client } = this.httpClient;
        const response = await client.post<boolean>(`${this.baseUrl}/validate-admin`, { name, password });
        return response.data;
    }
}
