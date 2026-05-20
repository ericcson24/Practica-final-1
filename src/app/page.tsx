"use client";

import CharacterCard from "@/components/CharacterCard";
import { GetAllCharacters, GetCharacterByName } from "@/lib/api";
import { Character } from "@/lib/types";
import { useState } from "react";

export default function Home() {
    const [Character,setCharacter]= useState<Character[]>([]);
    const [busqueda, setbusqueda] = useState("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<boolean>(false)

    async function fetchCharacters () {
        const query= busqueda.trim()
        const data = query
          ? await GetCharacterByName(query)
          : await GetAllCharacters();

        setCharacter(data);
    }

    return(
    <div>
        <div>
            <h1>Rick y Morti API</h1>
        </div>
        <div>
            <h2>Characters:</h2>
        </div>

        <div>
            <section>
                {Character.map((character)=>(<CharacterCard key={character.id} character={character}/>))}
            </section>
        </div>

    </div>
    )

}