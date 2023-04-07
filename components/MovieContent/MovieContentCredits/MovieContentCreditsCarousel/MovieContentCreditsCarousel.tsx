import React from "react";
import { Cast, Crew } from "@/types/types";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import MovieContentCreditsCarouselCastMember from "./MovieContentCarouselCastMember/MovieContentCarouselCastMember";
import MovieContentCreditsCarouselCrewMember from "./MovieContentCreditsCarouselCrewMember/MovieContentCreditsCarouselCrewMember";

interface MovieContentCreditsCarouselProps {
  cast?: Cast;
  crew?: Crew;
}

const MovieContentCreditsCarousel = ({
  cast,
  crew,
}: MovieContentCreditsCarouselProps) => {
  return (
    <Carousel
      slidesToShow={4}
      arrows
      nextArrow={<RightOutlined />}
      prevArrow={<LeftOutlined />}
      dots={false}
    >
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

export default MovieContentCreditsCarousel;
