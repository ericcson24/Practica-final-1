import Link from "next/link";
import "./AlbumCard.css";
import { Character } from "@/lib/types";

type CharacterProps = {
    character: Character
}

export default function CharacterCard({ character }: CharacterProps) {

    return (
        <div>
            <Link href={`/character/${character.id}`}>
            
            <div className="imagen">
                <img
                        src={character.image}
                        alt={`Foto de ${character.name}`}
                        className="Imagen"
                    />
            </div>

            <div className="nombre">
                <h3>{character.name}</h3>
            </div>


            
            </Link>
        </div>
    )

}