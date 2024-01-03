import { SeasonPageParams } from "@/types/types";
import { getSeriesData, getSeriesSeasonData } from "@/apiHelpers";
import SeriesSeasonContentEpisodes from "./components/SeriesSeasonContentEpisodes/SeriesSeasonContentEpisodes";
import SeriesSeasonContentSeasons from "./components/SeriesSeasonContentSeasons/SeriesSeasonContentSeasons";
import SeriesSeasonContentTopPanel from "./components/SeriesSeasonContentTopPanel/SeriesSeasonContentTopPanel";

import styles from "./SeriesSeason.module.scss";

export async function generateMetadata({
  params: { id, seasonId },
}: SeasonPageParams) {
  try {
    const numberSeriesId = Number(id);
    const numberSeasonId = Number(seasonId);
    const seriesData = await getSeriesData(numberSeriesId);
    const seasonDetails = await getSeriesSeasonData(
      numberSeriesId,
      numberSeasonId
    );
    const seriesDetails = seriesData?.seriesDetails;
    return {
      title: `${
        seriesDetails?.name
      } (${seriesDetails?.first_air_date?.substring(0, 4)} ${
        seriesDetails?.last_air_date &&
        ` - ${
          seriesDetails?.status === "Ended"
            ? seriesDetails?.last_air_date?.substring(0, 4)
            : ""
        }`
      }) ${seasonDetails?.name}`,
      description: seasonDetails?.overview,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

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
