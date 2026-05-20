"use client";

import CharacterCard from "@/components/CharacterCard";
import { GetAllCharacters, GetCharacterByName } from "@/lib/api";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./styles.css";

export default function Home() {
    // Lista de personajes cargados de la API
    const [characters, setCharacters] = useState<Character[]>([]);
    // Texto del input de búsqueda
    const [busqueda, setbusqueda] = useState("");
    // Mensaje de error si falla la petición
    const [error, setError] = useState<string>("");
    // Controla si se está cargando
    const [loading, setLoading] = useState<boolean>(true);
    // Togglear este valor dispara el useEffect (patrón búsqueda por botón)
    const [search, setSearch] = useState<boolean>(false);
    // Página actual de la paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    // Total de páginas devuelto por la API
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        // Flag para evitar actualizar estado si el componente se desmonta
        let isMounted = true;

        const fetchCharacters = async () => {
            setLoading(true);
            setError("");

            try {
                const query = busqueda.trim();
                // Si hay búsqueda usa el endpoint por nombre, si no trae todos
                const data = query
                    ? await GetCharacterByName(query, currentPage)
                    : await GetAllCharacters(currentPage);

                if (isMounted) {
                    setCharacters(data.results ?? []);
                    setTotalPages(data.info?.pages ?? 1); // total de páginas de la API
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

        // Debounce de 350ms para no disparar la petición en cada render
        const timeout = setTimeout(fetchCharacters, 350);

        // Cleanup: cancela el timeout y marca el componente como desmontado
        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [search, currentPage]); // se ejecuta al buscar o cambiar de página

    return(
    <main className="home">
        {/* Botón fijo arriba a la derecha para ir a favoritos */}
        <Link href="/favoritos" className="cornerButton">Favoritos</Link>
        <header className="homeHeader">
            <h1>Rick y Morti API</h1>
            <p>Explora personajes del multiverso.</p>
        </header>
        {/* Buscador: al pulsar Buscar resetea a pág 1 y togglea search */}
        <div className="searchForm">
            <input
                type="text"
                placeholder="Buscar personaje..."
                value={busqueda}
                onChange={(event) => setbusqueda(event.target.value)}
                className="searchInput"
            />
            <button className="searchButton" onClick={() => { setCurrentPage(1); setSearch((prev) => !prev); }}>Buscar</button>
            {/* Limpiar vacía el input y vuelve a la página 1 con todos */}
            <button className="clearButton" onClick={() => { setbusqueda(""); setCurrentPage(1); setSearch((prev) => !prev); }}>Limpiar</button>
        </div>
        {/* Controles de paginación: deshabilitados en los extremos o mientras carga */}
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
                {/* Estados de carga, error y lista de personajes */}
                {loading && <p className="statusText">Cargando personajes...</p>}
                {!loading && error && <p className="statusText errorText">{error}</p>}
                {!loading && !error && characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
        </section>
    </main>
    )

}