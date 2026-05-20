"use client";

import { Character } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

// Tipo del contexto: lista de favoritos + funciones para añadir y quitar
type CharacterContextType = {
	favCharactersList: Character[];
	favCharactersListPush: (item: Character) => void;
	favCharactersListPop: (item: Character) => void;
};

// Contexto inicializado a null; se comprueba en el hook useCharacter
const CharacterContext = createContext<CharacterContextType | null>(null);

// Proveedor que envuelve la app (añadido en layout.tsx)
export const CharacterProvider = ({ children }: { children: ReactNode }) => {
	// Lista de personajes marcados como favoritos
	const [favCharactersList, setFavCharactersList] = useState<Character[]>([]);

	// Añade un personaje solo si no está ya en la lista (evita duplicados)
	const favCharactersListPush = (item: Character) => {
		if (!favCharactersList.some((i) => i.id === item.id)) {
			setFavCharactersList([...favCharactersList, item]);
		}
	};

	// Elimina un personaje de la lista filtrando por id
	const favCharactersListPop = (item: Character) => {
		setFavCharactersList(favCharactersList.filter((e) => e.id !== item.id));
	};

	return (
		<CharacterContext.Provider
			value={{ favCharactersList, favCharactersListPush, favCharactersListPop }}
		>
			{children}
		</CharacterContext.Provider>
	);
};

// Hook personalizado para consumir el contexto; lanza error si se usa fuera del Provider
export const useCharacter = () => {
	const context = useContext(CharacterContext);
	if (!context) {
		throw new Error("Page out of context");
	}
	return context;
};
