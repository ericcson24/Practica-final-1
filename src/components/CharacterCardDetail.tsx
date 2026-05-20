"use client";

import { useCharacter } from "@/context/CharacterContext";
import { Character } from "@/lib/types";
import "./AlbumDetail.css";

type CharacterDetailProps = {
	character: Character;
};

export default function CharacterCardDetail({ character }: CharacterDetailProps) {
	const { favCharactersList, favCharactersListPush, favCharactersListPop } = useCharacter();
	const isFavorite = favCharactersList.some((item) => item.id === character.id);

	return (
		<article className="albumDetail">
			<div className="imagenDetail">
				<img src={character.image} alt={character.name} className="Imagen" />
				{!isFavorite ? (
					<button onClick={() => favCharactersListPush(character)}>Anadir a Favs</button>
				) : (
					<button onClick={() => favCharactersListPop(character)}>Quitar de Favs</button>
				)}
			</div>

			<div>
				<h1>{character.name}</h1>
				<p>Status: {character.status}</p>
				<p>ID: {character.id}</p>
			</div>
		</article>
	);
}

