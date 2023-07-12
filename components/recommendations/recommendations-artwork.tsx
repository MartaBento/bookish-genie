import Image from "next/image";

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
      <ul className="grid grid-cols-3 gap-8">
        {recommendations.map(({ book, author }, index) => {
          const bookDetail = bookInformation[index];
          const thumbnail = bookDetail?.volumeInfo?.imageLinks?.thumbnail;
          const identifier =
            bookDetail?.volumeInfo?.industryIdentifiers[0]?.identifier ?? "N/A";

          return (
            <li key={book}>
              <div className="flex flex-col items-center">
                <Image
                  src={thumbnail}
                  alt={book}
                  width={200}
                  height={100}
                  className="h-72 w-auto rounded-lg border-2 object-cover hover:opacity-80 hover:outline-dotted hover:outline-offset-2 hover:outline-teal-500 dark:hover:outline-indigo-950"
                />
                <section className="mt-4 text-center">
                  <h3 className="text-lg font-bold">{book}</h3>
                  <p className="text-gray-500">{author}</p>
                </section>
                <div className="mt-4 text-center">
                  <Button
                    variant="secondary"
                    className="border-2 hover:outline-dotted hover:outline-offset-2 hover:outline-teal-500 dark:hover:outline-indigo-950"
                    onClick={() =>
                      window.open(
                        `https://www.goodreads.com/search?q=${identifier}`,
                        "_blank"
                      )
                    }
                  >
                    View book details on Goodreads
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecommendationsArtwork;
