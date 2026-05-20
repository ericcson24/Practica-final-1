"use client";

import Link from "next/link";
import "./AlbumCard.css";
import { Character } from "@/lib/types";
import { useCharacter } from "@/context/CharacterContext";

type CharacterProps = {
    character: Character
}

export default function CharacterCard({ character }: CharacterProps) {
    // Extraemos la lista y las funciones del contexto de favoritos
    const { favCharactersList, favCharactersListPush, favCharactersListPop } = useCharacter();

    return (
        <div className="albumCard">
            {/* Imagen + botón de favorito dentro del Link para ir al detalle */}
            <Link href={`/character/${character.id}`}>
                <div className="imagenCard">
                    <img
                        src={character.image}
                        alt={`Foto de ${character.name}`}
                        className="Imagen"
                    />
                    {/* preventDefault + stopPropagation para no navegar al hacer clic en el botón */}
                    {!favCharactersList.some((i) => i.id === character.id) ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                favCharactersListPush(character);
                            }}
                        >
                            Anadir a Favs
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                favCharactersListPop(character);
                            }}
                        >
                            Quitar de Favs
                        </button>
                    )}
                </div>
            </Link>

            {/* Nombre del personaje como enlace al detalle */}
            <Link href={`/character/${character.id}`}>
                <div className="TituloCard">
                    <h1>{character.name}</h1>
                </div>
            </Link>
        </div>
    );
}