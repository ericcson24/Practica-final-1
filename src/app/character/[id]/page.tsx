"use client";

import { GetCharacterByID } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CharacterCardDetail from "@/components/CharacterCardDetail";
import Link from "next/link";
import "../../styles.css";

export default function CharacterPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function fetchCharacter() {
            if (!id) {
                setError("ID de personaje invalido.");
                setCharacter(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const data = await GetCharacterByID(id);
                setCharacter(data);
            } catch {
                setError("No se pudo cargar el personaje.");
                setCharacter(null);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacter();
    }, [id]);

    return (
        <main className="home">
            <Link href="/" className="cornerButton">Volver</Link>
            {loading && <p className="statusText">Cargando detalles...</p>}
            {!loading && error && <p className="statusText errorText">{error}</p>}
            {!loading && !error && character && (
                <section>
                    <CharacterCardDetail character={character} />
                </section>
            )}
        </main>
    );
}
