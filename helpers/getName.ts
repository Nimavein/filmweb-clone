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
  data:
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
  "title" in data ? data.title : "name" in data ? data.name : "Unknown Name";

export default getName;
