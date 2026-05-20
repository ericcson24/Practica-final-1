export type Character = {
    id:string;
    name: string;
    status:string;
    image:string;
}

export type CharacterInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type CharacterResponse = {
    info: CharacterInfo;
    results: Character[];
}