import { MediaType } from "@/types/types";

export const getSearchResultType = (resultMediaType: MediaType) => {
  switch (resultMediaType) {
    case "movie":
      return `/movie/`;
    case "tv":
      return `/series/`;
    case "person":
      return `/person/`;
    default:
      return `/search/`;
  }
};
