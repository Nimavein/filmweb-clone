export const getSearchResultType = (resultMediaType: string) => {
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
