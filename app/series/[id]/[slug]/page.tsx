import { PageIdParams } from "@/types/types";
import { getSeriesData, getSeriesReviews } from "@/apiHelpers";
import SeriesCredits from "./components/SeriesCredits/SeriesCredits";
import SeriesDescription from "./components/SeriesDescription/SeriesDescription";
import SeriesInformation from "./components/SeriesInformation/SeriesInformation";
import SeriesTopPanel from "./components/SeriesTopPanel/SeriesTopPanel";
import SeriesImages from "./components/SeriesImages/SeriesImages";
import SeriesReviews from "./components/SeriesReviews/SeriesReviews";
import SeriesRelated from "./components/SeriesRelated/SeriesRelated";

import styles from "./Series.module.scss";

export async function generateMetadata({ params: { id } }: PageIdParams) {
  const numberId = parseInt(id);
  try {
    const seriesData = await getSeriesData(numberId);
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
      })`,
      description: seriesData?.seriesDetails.overview,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

const Series = async ({ params: { id } }: PageIdParams) => {
  const numberId = parseInt(id);
  const seriesData = await getSeriesData(numberId);
  const seriesDetails = seriesData?.seriesDetails;
  const aggregateCredits = seriesDetails?.aggregate_credits;
  const images = seriesDetails?.images;
  const similarTvSeries = seriesDetails?.similar;
  const recommendedTvSeries = seriesDetails?.recommendations;
  const seriesReviews = await getSeriesReviews(numberId, 1);
  const seriesReviewsResults = seriesReviews?.results;

  return (
    seriesDetails && (
      <main className={styles["series"]}>
        <SeriesTopPanel seriesDetails={seriesDetails} />
        <SeriesDescription seriesDetails={seriesDetails} />
        {seriesReviewsResults && seriesReviewsResults?.length > 0 && (
          <SeriesReviews
            seriesDetails={seriesDetails}
            reviews={seriesReviews}
          />
        )}
        {aggregateCredits?.cast && aggregateCredits?.cast?.length > 0 && (
          <SeriesCredits seriesDetails={seriesDetails} />
        )}
        <SeriesInformation seriesDetails={seriesDetails} />
        {images?.backdrops && images?.backdrops?.length > 0 && (
          <SeriesImages seriesDetails={seriesDetails} />
        )}
        <SeriesRelated
          similarTvSeries={similarTvSeries}
          recommendedTvSeries={recommendedTvSeries}
        />
      </main>
    )
  );
};

export default Series;
