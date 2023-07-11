import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { BookVolume } from "@/types/bookInformationResponse";

import { Button } from "../ui/button";

type RecommendationsArtworkProps = {
  recommendations: { book: string; author: string }[];
  bookInformation: BookVolume[];
};

function RecommendationsArtwork({
  recommendations,
  bookInformation,
}: RecommendationsArtworkProps) {
  return (
    <div>
      <h2 className="sr-only">Recommended Books</h2>
      <ul className="grid grid-cols-3 gap-8">
        {recommendations.map(({ book, author }, index) => {
          const bookDetail = bookInformation[index];
          const thumbnail = bookDetail?.volumeInfo?.imageLinks?.thumbnail;
          const identifier =
            bookDetail?.volumeInfo?.industryIdentifiers[0]?.identifier ?? "N/A";

          return (
            <li key={book}>
              <article className="flex flex-col items-center">
                <figure className="rounded-lg shadow-md">
                  <Image src={thumbnail} alt={book} width={200} height={300} />
                </figure>
                <section className="mt-4 text-center">
                  <h3 className="text-lg font-bold">{book}</h3>
                  <p className="text-gray-500">{author}</p>
                </section>
                <footer className="space-y-6 text-center">
                  <p>
                    <span className="text-gray-400" aria-label="ISBN">
                      ISBN:
                    </span>{" "}
                    {identifier}
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      window.open(
                        `https://www.goodreads.com/search?q=${identifier}`,
                        "_blank"
                      )
                    }
                  >
                    View book details on Goodreads
                  </Button>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecommendationsArtwork;
