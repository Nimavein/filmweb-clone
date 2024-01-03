import React from "react";
import { Cast, Crew } from "@/types/types";
import MovieContentCreditsCarouselCastMember from "./MovieCreditsCarouselCastMember/MovieCreditsCarouselCastMember";
import MovieContentCreditsCarouselCrewMember from "./MovieCreditsCarouselCrewMember/MovieCreditsCarouselCrewMember";
import Carousel from "@/components/Carousel/Carousel";

interface MovieContentCreditsCarouselProps {
  cast?: Cast;
  crew?: Crew;
}
const MovieCreditsCarousel = ({
  cast,
  crew,
}: MovieContentCreditsCarouselProps) => {
  return (
    <Carousel>
      {cast
        ? cast?.map((castMember) => (
            <div key={castMember.credit_id}>
              <MovieContentCreditsCarouselCastMember {...castMember} />
            </div>
          ))
        : crew?.map((crewMember) => (
            <div key={crewMember.credit_id}>
              <MovieContentCreditsCarouselCrewMember {...crewMember} />
            </div>
          ))}
    </Carousel>
  );
};

export default MovieCreditsCarousel;
