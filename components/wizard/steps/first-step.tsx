// First Step: Ask the user to select their favorite genre or genres from a predefined list
// Second Step: Ask the user to specify the mood or theme they are interested in, such as uplifting, suspenseful, romantic, or any other relevant options.
// Third Step: Inquire about the user's preference for book length, such as short, medium, or long books.

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
        />
      ))}
    </div>
  );
}

export default FirstStep;
