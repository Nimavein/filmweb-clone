import { PageIdParams } from "@/types/types";
import { getPersonData } from "@/api";
import PersonCredits from "./components/PersonCredits/PersonCredits";
import PersonDetails from "./components/PersonDetails/PersonDetails";
import PersonImages from "./components/PersonImages/PersonImages";

import styles from "./Person.module.scss";

const Person = async ({ params: { id } }: PageIdParams) => {
  const numberId = parseInt(id);
  const personDetails = await getPersonData(numberId);
  const tvCredits = personDetails?.tv_credits;
  const movieCredits = personDetails?.movie_credits;
  const images = personDetails?.images;

  const areTvCreditsAvailable =
    (tvCredits?.cast && tvCredits?.cast?.length > 0) ||
    (tvCredits?.crew && tvCredits?.crew.length > 0);

  const areMovieCreditsAvailable =
    (movieCredits?.cast && movieCredits?.cast?.length > 0) ||
    (movieCredits?.crew && movieCredits?.crew?.length > 0);

  const areImagesAvailable = images?.profiles && images?.profiles?.length > 0;

  return (
    <main className={styles["person"]}>
      {personDetails && <PersonDetails personDetails={personDetails} />}
      {areMovieCreditsAvailable && personDetails && (
        <PersonCredits
          personDetails={personDetails}
          cast={movieCredits?.cast}
          crew={movieCredits?.crew}
          type="movies"
        />
      )}
      {areTvCreditsAvailable && personDetails && (
        <PersonCredits
          personDetails={personDetails}
          cast={tvCredits?.cast}
          crew={tvCredits?.crew}
          type="tv-series"
        />
      )}
      {areImagesAvailable && personDetails && (
        <PersonImages personDetails={personDetails} />
      )}
    </main>
  );
};

export default Person;
