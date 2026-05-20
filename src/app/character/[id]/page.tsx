"use client";

import { GetCharacterByID } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CharacterCardDetail from "@/components/CharacterCardDetail";
import Link from "next/link";
import "../../styles.css";

export default function CharacterPage() {
    // Obtenemos el id dinámico de la ruta /character/[id]
    const params = useParams<{ id: string }>();
    const id = params?.id;
    // Personaje cargado de la API
    const [character, setCharacter] = useState<Character | null>(null);
    // Estado de carga
    const [loading, setLoading] = useState<boolean>(true);
    // Mensaje de error si falla la petición
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function fetchCharacter() {
            // Guard: si no hay id válido mostramos error inmediatamente
            if (!id) {
                setError("ID de personaje invalido.");
                setCharacter(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                // Petición al endpoint /character/{id} que devuelve un único objeto
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
    }, [id]); // se re-ejecuta si cambia el id en la URL

    return (
        <main className="home">
            {/* Botón fijo arriba a la derecha para volver al listado */}
            <Link href="/" className="cornerButton">Volver</Link>
            {loading && <p className="statusText">Cargando detalles...</p>}
            {!loading && error && <p className="statusText errorText">{error}</p>}
            {/* Solo renderiza el detalle cuando hay datos y no hay error */}
            {!loading && !error && character && (
                <section>
                    <CharacterCardDetail character={character} />
                </section>
            )}
        </main>
    );
}
