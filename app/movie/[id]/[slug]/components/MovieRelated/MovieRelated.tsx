import { Movies } from "@/types/types";
import React from "react";
import MediaCarousel from "@/components/MediaCarousel/MediaCarousel";

import sectionStyles from "../../Movie.module.scss";

interface MovieRelatedProps {
  similarMovies: Movies | undefined;
  recommendedMovies: Movies | undefined;
}

const MovieRelated = ({
  similarMovies,
  recommendedMovies,
}: MovieRelatedProps) => {
  return (
    ((similarMovies && similarMovies?.total_results > 0) ||
      (recommendedMovies && recommendedMovies?.total_results > 0)) && (
      <section className={sectionStyles["movie-section"]}>
        {similarMovies && (
          <MediaCarousel
            medias={similarMovies}
            mediaType="movie"
            title="SIMILAR MOVIES"
          />
        )}
        {recommendedMovies && (
          <MediaCarousel
            medias={recommendedMovies}
            mediaType="movie"
            title="RECOMMENDED MOVIES"
          />
        )}
      </section>
    )
  );
};

export default MovieRelated;
