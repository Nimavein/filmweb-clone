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
  genres: { id: number; name: string }[];
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
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Crew {
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

export interface Cast {
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

export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";

export interface MoviesState {
  movies: Movie[];
  status: ApiStatus;
  error: string | null;
}

export interface NavbarLink {
  name: string;
  path: string;
}
