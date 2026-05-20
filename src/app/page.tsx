"use client";

import CharacterCard from "@/components/CharacterCard";
import { GetAllCharacters, GetCharacterByName } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./styles.css";

export default function Home() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [busqueda, setbusqueda] = useState("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        let isMounted = true;

        const fetchCharacters = async () => {
            setLoading(true);
            setError("");

            try {
                const query = busqueda.trim();
                const data = query
                    ? await GetCharacterByName(query, currentPage)
                    : await GetAllCharacters(currentPage);

                if (isMounted) {
                    setCharacters(data.results ?? []);
                    setTotalPages(data.info?.pages ?? 1);
                }
            } catch {
                if (isMounted) {
                    setError("No se pudieron cargar los personajes.");
                    setCharacters([]);
                    setTotalPages(1);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        const timeout = setTimeout(fetchCharacters, 350);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [search, currentPage]);

    return(
    <main className="home">
        <Link href="/favoritos" className="cornerButton">Favoritos</Link>
        <header className="homeHeader">
            <h1>Rick y Morti API</h1>
            <p>Explora personajes del multiverso.</p>
        </header>
        <div className="searchForm">
            <input
                type="text"
                placeholder="Buscar personaje..."
                value={busqueda}
                onChange={(event) => setbusqueda(event.target.value)}
                className="searchInput"
            />
            <button className="searchButton" onClick={() => { setCurrentPage(1); setSearch((prev) => !prev); }}>Buscar</button>
            <button className="clearButton" onClick={() => { setbusqueda(""); setCurrentPage(1); setSearch((prev) => !prev); }}>Limpiar</button>
        </div>
        <div className="pagination">
            <button
                className="searchButton"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
            >
                Anterior
            </button>
            <span className="pageInfo">Pagina {currentPage} de {totalPages}</span>
            <button
                className="searchButton"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages || loading}
            >
                Siguiente
            </button>
        </div>
        <div className="sectionTitle">
            <h2>Characters</h2>
        </div>

        <section className="charactersSection">
                {loading && <p className="statusText">Cargando personajes...</p>}
                {!loading && error && <p className="statusText errorText">{error}</p>}
                {!loading && !error && characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
        </section>
    </main>
    )

}