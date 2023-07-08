import Image from "next/image";

type ThemesArtworkProps = {
  name: string;
  cover: string;
  isSelected: boolean;
};

function ThemesArtwork({ name, cover, isSelected }: ThemesArtworkProps) {
  return (
    <div className="group relative block bg-black hover:cursor-pointer">
      <Image
        src={`/literaryThemes/${cover}`}
        alt={name}
        width={200}
        height={100}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-lg font-bold text-white sm:text-2xl">{name}</p>
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
}

export default ThemesArtwork;
