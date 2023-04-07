import { NavbarLinks } from "@/types/types";

export const navbarLinks: NavbarLinks = {
  home: { name: "Home", path: "/", key: "home" },
  movies: {
    main: { name: "Movies", path: "/movies", key: "movies" },
    popular: {
      name: "Popular",
      path: "/movies/popular",
      key: "movies-popular",
    },
    ranking: {
      name: "Ranking",
      path: "/movies/ranking",
      key: "movies-ranking",
    },
  },
  tvSeries: {
    main: { name: "TV Series", path: "/tv-series", key: "tv-series" },
  },
};
