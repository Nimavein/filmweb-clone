import { MenuProps } from "antd";

export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";

export interface Genre {
  id: number;
  name: string;
}

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

export interface Movies {
  page?: number;
  results?: Movie[];
  total_results?: number;
  total_pages?: number;
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

export interface MovieReview {
  author?: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number;
  };
  content?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  url?: string;
  rating?: number | null;
}

export interface MovieReviews {
  id?: number;
  page?: number;
  results?: MovieReview[];
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
  movies: {
    main: NavbarLink;
    popular: NavbarLink;
    ranking: NavbarLink;
  };
  tvSeries: {
    main: NavbarLink;
  };
  people: {
    main: NavbarLink;
    popular: NavbarLink;
  };
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
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number;
  vote_count?: number;
  width?: number;
  posters?: Poster[];
}

interface Profile {
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
