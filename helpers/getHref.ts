import { MediaType } from "@/types/types";

const getHref = (type: MediaType, name: string, id: number) => {
  const hrefParams = `${id}/${name}/`;
  switch (type) {
    case "movie":
      return `/movie/${hrefParams}`;
    case "tv":
      return `/series/${hrefParams}`;
    case "person":
      return `/person/${hrefParams}`;
    default:
      return `/search/${hrefParams}`;
  }
};

export default getHref;
