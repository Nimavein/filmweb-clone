import { MediaType } from "@/types/types";

const getMediaHref = (resultMediaType: MediaType, mediaId: number) => {
  switch (resultMediaType) {
    case "movie":
      return `/movie/${mediaId}/`;
    case "tv":
      return `/series/${mediaId}/`;
    case "person":
      return `/person/${mediaId}/`;
    default:
      return `/search/${mediaId}/`;
  }
};

export default getMediaHref;
