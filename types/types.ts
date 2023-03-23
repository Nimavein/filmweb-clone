export interface Movie {
  id: number;
  original_language: string;
  original_title: string;
  overview: number;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean | string;
  vote_average: number;
  vote_count: number;
}

export interface AppState {
  movies: MoviesState;
}

export interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface NavbarLink {
    name: string;
    path: string;
}