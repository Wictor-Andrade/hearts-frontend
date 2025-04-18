import {HttpClient} from "@/utils/HttpClient";
import {RoomsApi} from "@/services/roomsApi";

const httpClient = HttpClient.getInstance();


export const roomsApi = new RoomsApi(httpClient);

