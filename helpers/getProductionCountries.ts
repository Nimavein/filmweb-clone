import { ProductionCountry } from "@/types/types";

export const getProductionCountries = (
  production_countries: ProductionCountry[] = []
) => production_countries?.map((country) => country.name)?.join(", ");
