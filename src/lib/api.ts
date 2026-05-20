import axios from "axios";
import { CharacterResponse, Character } from "../lib/types"


const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    timeout: 10000
});

async function search(endpoint:string): Promise<CharacterResponse> {
    try {
        const response = await api.get <CharacterResponse>(endpoint)
        return response.data
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
    
}

async function searchOne(endpoint: string): Promise<Character> {
    try {
        const response = await api.get<Character>(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function GetAllCharacters(page = 1):Promise<CharacterResponse> {
    return search(`/character?page=${page}`)
}

export async function GetCharacterByID(id:string): Promise<Character> {
    try{
    return searchOne(`/character/${id}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function GetCharacterByName(name:string, page = 1): Promise<CharacterResponse> {
    try{
    return search(`/character/?name=${name}&page=${page}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}