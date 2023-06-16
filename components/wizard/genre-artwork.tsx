import Image from "next/image"

import { cn } from "@/lib/utils"

type GenreArtworkProps = {
  name: string
  description: string
  cover: string
}

function GenreArtwork({ name, description, cover }: GenreArtworkProps) {
  return (
    <div className="space-y-1 text-sm">
      <div className="overflow-hidden">
        <Image
          src={`/literaryGenres/${cover}`}
          alt={name}
          width={200}
          height={100}
          className="aspect-square h-auto w-auto rounded-md object-cover transition-all hover:scale-105 hover:opacity-95"
        />
      </div>
      <p className="font-medium leading-none">{name}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

export default GenreArtwork
