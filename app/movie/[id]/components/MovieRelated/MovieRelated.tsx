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
    (similarMovies || recommendedMovies) && (
      <section className={sectionStyles["movie-section"]}>
        {similarMovies && (
          <MediaCarousel
            medias={similarMovies}
            type="movies"
            title="SIMILAR MOVIES"
          />
        )}
        {recommendedMovies && (
          <MediaCarousel
            medias={recommendedMovies}
            type="movies"
            title="RECOMMENDED MOVIES"
          />
        )}
      </section>
    )
  );
};

export default MovieRelated;
