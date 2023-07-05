import Image from "next/image";

type ThemesArtworkProps = {
  name: string;
  cover: string;
};

function ThemesArtwork({ name, cover }: ThemesArtworkProps) {
  return (
    <div className="space-y-1.5 text-sm">
      <div className="overflow-hidden">
        <Image
          src={`/literaryThemes/${cover}`}
          alt={name}
          width={200}
          height={100}
          className="aspect-square h-auto w-auto rounded-md object-cover transition-all hover:scale-105 hover:cursor-pointer hover:opacity-95"
        />
      </div>
      <p className="font-medium leading-none">{name}</p>
    </div>
  );
}

export default ThemesArtwork;
