import { TvSeries } from "@/types/types";
import React from "react";
import MediaCarousel from "@/components/MediaCarousel/MediaCarousel";

import sectionStyles from "../../Series.module.scss";

interface MovieRelatedProps {
  similarTvSeries: TvSeries | undefined;
  recommendedTvSeries: TvSeries | undefined;
}

const SeriesRelated = ({
  similarTvSeries,
  recommendedTvSeries,
}: MovieRelatedProps) => {
  return (
    (similarTvSeries || recommendedTvSeries) && (
      <section className={sectionStyles["series-section"]}>
        {similarTvSeries && (
          <MediaCarousel
            medias={similarTvSeries}
            type="tv-series"
            title="SIMILAR TV SERIES"
          />
        )}
        {recommendedTvSeries && (
          <MediaCarousel
            medias={recommendedTvSeries}
            type="tv-series"
            title="RECOMMENDED TV SERIES"
          />
        )}
      </section>
    )
  );
};

export default SeriesRelated;
