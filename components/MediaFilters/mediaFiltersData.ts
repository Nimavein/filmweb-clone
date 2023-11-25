import { GenresDTO, MediaFilterType, MediaSortGroupsType } from "@/types/types";

const mediaFiltersSortOptions: MediaSortGroupsType = [
  {
    label: "Popularity",
    options: [
      { label: "Most popular", value: "popularity.desc" },
      { label: "Least popular", value: "popularity.asc" },
    ],
  },
  {
    label: "Revenue",
    options: [
      { label: "Most revenue", value: "revenue.desc" },
      { label: "Least revenue", value: "revenue.asc" },
    ],
  },
  {
    label: "Release date",
    options: [
      { label: "The youngest", value: "primary_release_date.desc" },
      { label: "The oldest", value: "primary_release_date.asc" },
    ],
  },
  {
    label: "Vote average",
    options: [
      { label: "Best rated", value: "vote_average.desc" },
      { label: "Worst rated", value: "vote_average.asc" },
    ],
  },
  {
    label: "Vote count",
    options: [
      { label: "The youngest", value: "vote_count.desc" },
      { label: "The oldest", value: "vote_count.asc" },
    ],
  },
];

const generateYearValues = () =>
  Array.from({ length: 101 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year };
  });

const getMediaFilters = (genres: GenresDTO["genres"]): MediaFilterType[] => [
  {
    label: "Original Language",
    name: "originalLanguage",
    values: [
      { label: "English", value: "en" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "French", value: "fr" },
      { label: "Polish", value: "pl" },
    ],
  },
  {
    label: "Genre",
    name: "genre",
    values: genres?.map((genre) => ({ label: genre.name, value: genre.id })) || [],
  },
  {
    label: "Production Year",
    name: "productionYear",
    values: generateYearValues(),
  },
];

export { mediaFiltersSortOptions, getMediaFilters };
