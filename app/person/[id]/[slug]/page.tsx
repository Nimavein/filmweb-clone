import { PageIdParams } from "@/types/types";
import { getPersonData } from "@/apiHelpers";
import PersonCredits from "./components/PersonCredits/PersonCredits";
import PersonDetails from "./components/PersonDetails/PersonDetails";
import PersonImages from "./components/PersonImages/PersonImages";

import styles from "./Person.module.scss";

export async function generateMetadata({ params: { id } }: PageIdParams) {
  const numberId = parseInt(id);
  try {
    const personDetails = await getPersonData(numberId);
    return {
      title: personDetails?.name,
      description: personDetails?.biography,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

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
          mediaType="movie"
        />
      )}
      {areTvCreditsAvailable && personDetails && (
        <PersonCredits
          personDetails={personDetails}
          cast={tvCredits?.cast}
          crew={tvCredits?.crew}
          mediaType="tv"
        />
      )}
      {areImagesAvailable && personDetails && (
        <PersonImages personDetails={personDetails} />
      )}
    </main>
  );
};

export default Person;
