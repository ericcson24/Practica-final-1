"use client";

import { GetCharacterByID } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";


export default function CharacterPage({ params }: { params: { id: string } }) {
    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await GetCharacterByID(params.id);
                setCharacter(data[0] || null);
            } catch (err) {
                setError("Failed to fetch character.");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [params.id]);

    if (loading) {
        return <div className="statusText">Loading...</div>;
    }

    if (error) {
        return <div className="statusText errorText">{error}</div>;
    }

    if (!character) {
        return <div className="statusText">Character not found.</div>;
    }

    return (
        <div className="charactersSection">
            <div>
                <h2>{character.name}</h2>
                <p>Status: {character.status}</p>
            </div>
            <div>
                <img src={character.image} alt={character.name} className="characterImage" />
            </div>
        </div>
    );
}
