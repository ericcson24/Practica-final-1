"use client";

import { Character } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

type CharacterContextType = {
	favCharactersList: Character[];
	favCharactersListPush: (item: Character) => void;
	favCharactersListPop: (item: Character) => void;
};

const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
	const [favCharactersList, setFavCharactersList] = useState<Character[]>([]);

	const favCharactersListPush = (item: Character) => {
		if (!favCharactersList.some((i) => i.id === item.id)) {
			setFavCharactersList([...favCharactersList, item]);
		}
	};

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

export const useCharacter = () => {
	const context = useContext(CharacterContext);
	if (!context) {
		throw new Error("Page out of context");
	}
	return context;
};
