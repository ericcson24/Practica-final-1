import axios from "axios";
import { CharacterResponse, Character } from "../lib/types"


const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    timeout: 10000
});

async function search(endpoint:string): Promise<Character[]> {
    try {
        const response = await api.get <CharacterResponse>(endpoint)
        return response.data.results ?? []
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
    
}

export async function GetAllCharacters():Promise<Character[]> {
    return search(`/character`)
}

export async function GetCharacterByID(id:string) {
    try{
    return search(`/character/${id}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function GetCharacterByName(name:string) {
    try{
    return search(`/character/?name=${name}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}