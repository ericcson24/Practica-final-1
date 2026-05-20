"use client";

import { useCharacter } from "@/context/CharacterContext";
import { Character } from "@/lib/types";
import "./AlbumDetail.css";

type CharacterDetailProps = {
	character: Character;
};

export default function CharacterCardDetail({ character }: CharacterDetailProps) {
	// Accede al contexto para saber si el personaje ya es favorito
	const { favCharactersList, favCharactersListPush, favCharactersListPop } = useCharacter();
	// Comprueba si este personaje está en la lista de favoritos
	const isFavorite = favCharactersList.some((item) => item.id === character.id);

	return (
		<article className="albumDetail">
			<div className="imagenDetail">
				<img src={character.image} alt={character.name} className="Imagen" />
				{/* Botón condicional: añadir si no es favorito, quitar si lo es */}
				{!isFavorite ? (
					<button onClick={() => favCharactersListPush(character)}>Anadir a Favs</button>
				) : (
					<button onClick={() => favCharactersListPop(character)}>Quitar de Favs</button>
				)}
			</div>

			{/* Información textual del personaje */}
			<div>
				<h1>{character.name}</h1>
				<p>Status: {character.status}</p>
				<p>ID: {character.id}</p>
			</div>
		</article>
	);
}

