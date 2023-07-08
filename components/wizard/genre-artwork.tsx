import Image from "next/image";

type GenreArtworkProps = {
  name: string;
  description: string;
  cover: string;
  selectedGenre?: string;
  onClickGenreCard: (genre: string) => void;
};

function GenreArtwork({
  name,
  description,
  cover,
  selectedGenre,
  onClickGenreCard,
}: GenreArtworkProps) {
  const handleSelectGenreCard = () => {
    onClickGenreCard(name);
  };

  return (
    <div
      className={`group relative block bg-black hover:cursor-pointer ${
        selectedGenre === name ? "bg-blue-500" : ""
      }`}
      onClick={handleSelectGenreCard}
    >
      <Image
        src={`/literaryGenres/${cover}`}
        alt={name}
        width={200}
        height={100}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-lg font-bold text-white sm:text-2xl">{name}</p>
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreArtwork;
