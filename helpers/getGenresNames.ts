import { Genre } from "@/types/types";

export const getGenresNames = (genres: Genre[] = []) =>
  genres?.map((genre) => genre.name)?.join(", ");
