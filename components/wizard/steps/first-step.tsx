import { literaryGenres } from "@/data/literaryGenres";

import GenreArtwork from "../genre-artwork";

function FirstStep() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {literaryGenres.map((genre) => (
        <GenreArtwork
          name={genre.name}
          description={genre.description}
          cover={genre.cover}
          isSelected
        />
      ))}
    </div>
  );
}

export default FirstStep;
