export type Character = {
    id:string;
    name: string;
    status:string;
    image:string;
}

export type CharacterResponse = {
    results: Character[];
}