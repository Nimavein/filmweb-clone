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
  },
  tvSeries: {
    main: { name: "TV Series", path: "/tv-series", key: "tv-series" },
    popular: { name: "Popular", path: "/tv-series/popular", key: "tv-series-popular" },
  },
  people: {
    main: { name: "People", path: "/people", key: "people" },
    popular: { name: "Popular", path: "/people/popular", key: "people-popular" },
  },
  vod: { name: "Vod", path: "/vod", key: "vod" },
  rankings: {name: "Rankings", path: "/rankings", key:"rankings" },
};
