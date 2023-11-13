import { SeasonPageParams } from "@/types/types";
import { getSeriesData, getSeriesSeasonData } from "@/api";
import SeriesSeasonContentEpisodes from "./components/SeriesSeasonContentEpisodes/SeriesSeasonContentEpisodes";
import SeriesSeasonContentSeasons from "./components/SeriesSeasonContentSeasons/SeriesSeasonContentSeasons";
import SeriesSeasonContentTopPanel from "./components/SeriesSeasonContentTopPanel/SeriesSeasonContentTopPanel";

import styles from "./SeriesSeason.module.scss";

const SeriesSeasons = async ({
  params: { id, seasonId },
}: SeasonPageParams) => {
  const numberSeriesId = Number(id);
  const numberSeasonId = Number(seasonId);
  const seriesData = await getSeriesData(numberSeriesId);
  const seasonDetails = await getSeriesSeasonData(
    numberSeriesId,
    numberSeasonId
  );
  const seriesDetails = seriesData?.seriesDetails;

  return (
    seasonDetails &&
    seriesDetails && (
      <main className={styles["series-season-content"]}>
        <SeriesSeasonContentTopPanel
          seriesDetails={seriesDetails}
          seasonDetails={seasonDetails}
        />
        <SeriesSeasonContentSeasons
          seasonDetails={seasonDetails}
          seriesDetails={seriesDetails}
        />
        <SeriesSeasonContentEpisodes seasonDetails={seasonDetails} />
      </main>
    )
  );
};

export default SeriesSeasons;
