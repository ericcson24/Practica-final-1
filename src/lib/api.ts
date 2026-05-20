import axios from "axios";
import { CharacterResponse, Character } from "../lib/types"

// Instancia de axios con la URL base de la API y timeout de 10s
const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    timeout: 10000
});

// Función interna para peticiones que devuelven lista paginada (info + results)
async function search(endpoint:string): Promise<CharacterResponse> {
    try {
        const response = await api.get <CharacterResponse>(endpoint)
        return response.data
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
    
}

// Función interna para peticiones que devuelven un único objeto Character
async function searchOne(endpoint: string): Promise<Character> {
    try {
        const response = await api.get<Character>(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// Devuelve todos los personajes de una página concreta
export async function GetAllCharacters(page = 1):Promise<CharacterResponse> {
    return search(`/character?page=${page}`)
}

// Devuelve un personaje por su ID
export async function GetCharacterByID(id:string): Promise<Character> {
    try{
    return searchOne(`/character/${id}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// Devuelve personajes cuyo nombre coincide con el parámetro, con paginación
export async function GetCharacterByName(name:string, page = 1): Promise<CharacterResponse> {
    try{
    return search(`/character/?name=${name}&page=${page}`)
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}