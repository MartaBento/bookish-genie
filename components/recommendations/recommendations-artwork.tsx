type RecommendationsArtworkProps = {
  recommendations: { book: string; author: string }[];
};

function RecommendationsArtwork({
  recommendations,
}: RecommendationsArtworkProps) {
  // const goodreadsURL = `https://www.goodreads.com/search?q=${isbn}`;

  return (
    <div>
      {recommendations.map((recommendation) => (
        <p key={recommendation.book}>
          Book: {recommendation.book}, Author: {recommendation.author}
        </p>
      ))}
    </div>
  );
}

export default RecommendationsArtwork;
