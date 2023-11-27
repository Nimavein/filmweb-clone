import { MenuProps } from "antd";

export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";

export interface Genre {
  id: number;
  name: string;
}

export type MediaType = "movie" | "tv" | "person";

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Movie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean | string;
  vote_average: number;
  vote_count: number;
}

export interface RatedMovie extends Movie {
  rating: number;
}
export interface Movies {
  page?: number;
  results?: Movie[];
  total_results?: number;
  total_pages?: number;
}

export interface RatedMovies extends Movies {
  results?: RatedMovie[];
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  images: Images;
  videos: Videos;
  media_type: MediaType;
  recommendations: Movies;
  similar: Movies;
}

export interface CrewMember {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  department?: string;
  job?: string;
}

export type Crew = CrewMember[];

export interface CastMember {
  adult: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export type Cast = CastMember[];

export interface Credits {
  id: number;
  crew: Crew;
  cast: Cast;
}

export interface Review {
  author?: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number;
  };
  content?: string;
  created_at?: string;
  id?: string | number | null;
  updated_at?: string;
  url?: string;
  rating?: number | null;
}

export interface Reviews {
  id?: number;
  page?: number;
  results?: Reviews[];
  total_pages?: number;
  total_results?: number;
}
export interface AppState {
  movies: MoviesState;
}

export interface MoviesState {
  movies: Movie[];
  status: ApiStatus;
  error: string | null;
}

export interface NavbarLink {
  name: string;
  path: string;
  key: string;
}

export interface NavbarLinks {
  home: NavbarLink;
  movies: NavbarLink;
  tvSeries: NavbarLink;
  people: NavbarLink;
  vod: NavbarLink;
  rankings: NavbarLink;
}

export interface Backdrop {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface Poster {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface Images {
  id: number;
  backdrops?: Backdrop[];
  posters?: Poster[];
}

export interface Video {
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  key?: string;
  site?: string;
  size?: number;
  type?: string;
  official?: boolean;
  published_at?: string;
  id?: string;
}

export type VideosResults = Video[];
export interface Videos {
  id?: number;
  results?: VideosResults[];
}

export interface Profile {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: null;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface PersonImages {
  id?: number;
  profiles?: Profile[];
}

export type MenuItem = Required<MenuProps>["items"][number];

export interface PersonDetails {
  birthday?: string | null;
  known_for_department?: string;
  deathday?: string | null;
  id?: number;
  name?: string;
  also_known_as?: string[];
  gender?: number;
  biography?: string;
  popularity?: number;
  place_of_birth?: string | null;
  profile_path?: string | null;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string | null;
  tv_credits: PersonTvCredits;
  movie_credits: PersonMovieCredits;
  images: PersonImages;
  media_type: MediaType;
}

export interface KnownForMovie {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  original_title?: string;
  genre_ids?: Array<number>;
  id?: number;
  media_type?: "movie";
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface KnownForTv {
  poster_path?: string | null;
  popularity?: number;
  id?: number;
  overview?: string;
  backdrop_path?: string | null;
  vote_average?: number;
  media_type: "tv";
  first_air_date?: string;
  origin_country?: Array<string>;
  genre_ids?: Array<number>;
  original_language?: string;
  vote_count?: number;
  name?: string;
  original_name?: string;
}

export interface PeopleResult {
  adult?: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  popularity: number;
  id?: number;
  known_for?: KnownForMovie[] | KnownForTv[];
  profile_path?: string;
}

export interface People {
  page?: number;
  results?: PeopleResult[];
  total_results?: number;
  total_pages?: number;
}

export interface PersonMovieCastMember {
  character?: string;
  credit_id?: string;
  release_date?: string;
  vote_count?: number;
  video?: boolean;
  adult?: boolean;
  vote_average?: number;
  title?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  popularity?: number;
  id?: number;
  backdrop_path?: string | null;
  overview?: string;
  poster_path?: string | null;
}

export type PersonMovieCast = PersonMovieCastMember[];

export interface PersonMovieCrewMember {
  id?: number;
  department?: string;
  original_language?: string;
  original_title?: string;
  job?: string;
  overview?: string;
  vote_count?: number;
  video?: boolean;
  poster_path?: string | null;
  backdrop_path?: string | null;
  title?: string;
  popularity?: number;
  genre_ids?: number[];
  vote_average?: number;
  adult?: boolean;
  release_date?: string;
  credit_id?: string;
}

export type PersonMovieCrew = PersonMovieCrewMember[];

export interface PersonMovieCredits {
  cast: PersonMovieCast;
  crew: PersonMovieCrew;
  id: number;
}

export interface PersonTvCastMember {
  credit_id?: string;
  original_name?: string;
  id?: number;
  genre_ids?: number[];
  character?: string;
  name?: string;
  poster_path?: string | null;
  vote_count?: number;
  vote_average?: number;
  popularity?: number;
  episode_count?: number;
  original_language?: string;
  first_air_date?: string;
  backdrop_path?: string | null;
  overview?: string;
  origin_country?: string[];
}

export type PersonTvCast = PersonTvCastMember[];

export interface PersonTvCrewMember {
  id?: number;
  department?: string;
  original_language?: string;
  episode_count?: number;
  job?: string;
  overview?: string;
  origin_country?: string[];
  original_name?: string;
  genre_ids?: number[];
  name?: string;
  first_air_date?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
  poster_path?: string | null;
  credit_id?: string;
}

export type PersonTvCrew = PersonTvCrewMember[];

export interface PersonTvCredits {
  cast: PersonTvCast;
  crew: PersonTvCrew;
  id: number;
}

export interface Series {
  poster_path?: string | null;
  popularity?: number;
  id: number;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  first_air_date?: string;
  origin_country?: string[];
  genre_ids?: number[];
  original_language?: string;
  vote_count?: number;
  name: string;
  original_name?: string;
}

export interface RatedSeries extends Series {
  rating: number;
}

export interface TvSeries {
  page?: number;
  results?: Series[];
  total_results?: number;
  total_pages?: number;
}
export interface RatedTvSeries extends TvSeries {
  results?: RatedSeries[];
}

export interface SeriesCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface SeriesNetworkType {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface SeriesProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country?: string;
}

export interface SeriesSeason {
  air_date?: string;
  episode_count?: number;
  id?: number;
  name?: string;
  overview?: string;
  poster_path?: string;
  season_number?: number;
}

export interface SeriesLastEpisode {
  air_date?: string;
  episode_number?: number;
  id?: number;
  name?: string;
  overview?: string;
  production_code?: string;
  season_number?: number;
  still_path?: string | null;
  vote_average?: number;
  vote_count?: number;
}
export interface SeriesDetails {
  backdrop_path?: string | null;
  created_by?: SeriesCreator[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres?: Genre[];
  homepage?: string;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: SeriesLastEpisode;
  name?: string;
  next_episode_to_air?: null;
  networks?: SeriesNetworkType[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: SeriesProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: SeriesSeason[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
  aggregate_credits: SeriesAggregateCredits | null;
  images: Images;
  videos: Videos;
  media_type: MediaType;
  recommendations: TvSeries;
  similar: TvSeries;
}

export interface SeriesAggregateCreditsCastRoles {
  credit_id?: string;
  character?: string;
  episode_count?: number;
  total_episode_count?: number;
  order?: number;
}
export interface SeriesAggregateCreditsCastMember {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  roles?: SeriesAggregateCreditsCastRoles[];
}

export interface SeriesAggregateCreditsCrewJobs {
  credit_id?: string;
  job?: string;
  episode_count?: number;
  department?: string;
  total_episode_count?: number;
}
export interface SeriesAggregateCreditsCrewMember {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  jobs?: SeriesAggregateCreditsCrewJobs[];
}

export type SeriesAggregateCreditsCast = SeriesAggregateCreditsCastMember[];
export type SeriesAggregateCreditsCrew = SeriesAggregateCreditsCrewMember[];

export interface SeriesAggregateCredits {
  cast?: SeriesAggregateCreditsCast;
  crew?: SeriesAggregateCreditsCrew;
}

export interface GuestStar {
  credit_id?: string;
  order?: number;
  character?: string;
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
}

export type GuestStars = GuestStar[];

export interface SeriesEpisode {
  air_date?: string;
  episode_number?: number;
  crew?: Crew;
  guest_stars?: GuestStars;
  id?: number;
  name?: string;
  overview?: string;
  production_code?: string;
  season_number?: number;
  still_path?: string;
  vote_average?: number;
  vote_count?: number;
}

export type SeriesEpisodes = SeriesEpisode[];

export interface SeasonDetails {
  _id?: string;
  air_date?: string;
  episodes?: SeriesEpisodes;
  name?: string;
  overview?: string;
  id?: number;
  poster_path?: string | null;
  season_number?: number;
}

export interface ProviderItem {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export type ProviderRent = ProviderItem[] | null;
export type ProviderFlatRate = ProviderItem[] | null;
export type ProviderBuy = ProviderItem[] | null;
export interface WatchProvidersResult {
  link: string;
  flatrate: ProviderFlatRate;
  rent: ProviderRent;
  buy: ProviderBuy;
}

export interface WatchProviders {
  id: number;
  results: {
    [countryCode: string]: WatchProvidersResult;
  };
}

export interface GetWatchProvidersResult {
  display_priority?: number;
  logo_path?: string;
  provider_name?: string;
  provider_id: number;
}

export type GetWatchProvidersResults = GetWatchProvidersResult[];

export interface GetWatchProviders {
  results: GetWatchProvidersResults;
}

export interface WatchProvidersFiltersType {
  watchProviderId: number | null;
  sortBy: string | null;
}

export type SearchResults = Array<
  MovieDetails | SeriesDetails | PersonDetails
> | null;

export interface Article {
  id: string;
  title: string;
  link: string;
  mainImage: {
    url: string;
  };
  status: string;
}

export type News = Article[];

export interface CollectionDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: Movie[];
}

export type RankingSort =
  | "popularity.desc"
  | "popularity.inc"
  | "vote_average.desc"
  | "vote_average.inc";

export interface RankingSortOption {
  label: string;
  value: RankingSort;
}

export type FiltersContentType = "movies" | "tv-series";

export interface ActiveMediaFiltersType {
  originalLanguage: string[];
  genre: string[];
  productionYear: string[];
}

export type PageIdParams = {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
};

export type PageSearchParams = {
  searchParams: {
    query: string;
  };
};

export type PageVodParams = {
  searchParams: {
    watchProvider: string;
    sortBy: string;
  };
};

export type PageRankingParams = {
  searchParams: {
    sortBy: string;
    originalLanguage: string;
    genre: string;
    productionYear: string;
  };
};

export type PagePaginationParams = {
  searchParams: {
    page: string;
  };
} & PageRankingParams;

export type SeasonPageParams = {
  params: {
    id: string;
    seasonId: string;
  };
};

export interface GenreType {
  id: number;
  name: string;
}

export type GenresDTO = {
  genres: GenreType[];
};

export interface RequestTokenType {
  success: boolean;
  expires_at: Date;
  request_token: string;
}

export interface SessionType {
  success: boolean;
  session_id: string;
}

export interface AccountDataType {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface NetworkImageType {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface NetworkImagesDTO {
  id: number;
  logos: NetworkImageType[];
}

export interface MediaSortGroupType {
  label: string;
  options: { label: string; value: string }[];
}

export type MediaSortGroupsType = MediaSortGroupType[];


export interface MediaFilterType {
  label: string;
  name: keyof ActiveMediaFiltersType;
  values: { label: string; value: string | number }[];
}
