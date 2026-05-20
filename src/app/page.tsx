"use client";

import CharacterCard from "@/components/CharacterCard";
import { GetAllCharacters, GetCharacterByName } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [busqueda, setbusqueda] = useState("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<boolean>(false)

    async function fetchCharacters () {
        try {
            setLoading(true);
            setError("");
            const query = busqueda.trim();
            const data = query
              ? await GetCharacterByName(query)
              : await GetAllCharacters();

            setCharacters(data);
        } catch {
            setError("No se pudieron cargar los personajes.");
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

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
                {loading && <p>Cargando personajes...</p>}
                {!loading && error && <p>{error}</p>}
                {!loading && !error && characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </section>
        </div>

    </div>
    )

}