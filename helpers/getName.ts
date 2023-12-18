import {
  KnownForMovie,
  KnownForTv,
  Movie,
  MovieDetails,
  PersonDetails,
  PersonMovieCastMember,
  PersonMovieCrewMember,
  PersonTvCastMember,
  PersonTvCrewMember,
  Series,
  SeriesDetails,
} from "@/types/types";

const getName = (
  media:
    | Series
    | Movie
    | MovieDetails
    | SeriesDetails
    | PersonDetails
    | KnownForMovie
    | KnownForTv
    | PersonMovieCastMember
    | PersonMovieCrewMember
    | PersonTvCastMember
    | PersonTvCrewMember
): string =>
  "title" in media
    ? media.title
    : "name" in media
    ? media.name
    : "Unknown Title";

export default getName;
