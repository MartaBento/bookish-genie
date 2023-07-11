import Image from "next/image";
import Link from "next/link";

import { BookVolume } from "@/types/bookInformationResponse";

type RecommendationsArtworkProps = {
  recommendations: { book: string; author: string }[];
  bookInformation: BookVolume[];
};

function RecommendationsArtwork({
  recommendations,
  bookInformation,
}: RecommendationsArtworkProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {recommendations.map((recommendation, index) => {
        const bookDetail = bookInformation[index];

        return (
          <div key={recommendation.book} className="flex flex-col items-center">
            <Image
              src={bookDetail.volumeInfo.imageLinks.thumbnail}
              alt={recommendation.book}
              width={200}
              height={300}
              className="rounded-lg shadow-md"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold">{recommendation.book}</h3>
              <p className="text-gray-500">{recommendation.author}</p>
            </div>
            <p className="text-center">
              ISBN: {bookDetail.volumeInfo.industryIdentifiers[0].identifier}
            </p>
            <p className="text-center">
              <Link
                href={`https://www.goodreads.com/search?q=${bookDetail.volumeInfo.industryIdentifiers[0].identifier}`}
              >
                <p className="text-blue-500 underline">Goodreads</p>
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default RecommendationsArtwork;
