"use client";

import CharacterCard from "@/components/CharacterCard";
import { useCharacter } from "@/context/CharacterContext";
import "@/app/styles.css";
import Link from "next/link";

const Favoritos = () => {
	const { favCharactersList } = useCharacter();

	return (
		<div className="resultados">
			<Link href="/" className="cornerButton">Inicio</Link>
			<section className="grid">
				{favCharactersList.length ? (
					favCharactersList.map((character) => (
						<CharacterCard character={character} key={character.id} />
					))
				) : (
					<h1>No hay favs</h1>
				)}
			</section>
		</div>
	);
};

export default Favoritos;
