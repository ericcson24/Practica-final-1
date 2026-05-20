"use client";

import CharacterCard from "@/components/CharacterCard";
import { useCharacter } from "@/context/CharacterContext";
import "@/app/styles.css";
import Link from "next/link";

const Favoritos = () => {
	// Obtenemos la lista de favoritos del contexto global
	const { favCharactersList } = useCharacter();

	return (
		<div className="resultados">
			{/* Botón fijo arriba a la derecha para volver al inicio */}
			<Link href="/" className="cornerButton">Inicio</Link>
			<section className="grid">
				{/* Si hay favoritos los renderiza, si no muestra mensaje vacío */}
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
