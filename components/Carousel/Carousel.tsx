/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Carousel as AntdCarousel, CarouselProps } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const CustomRightOutlined = ({ currentSlide, slideCount, ...props }: any) => {
  return <RightOutlined {...props} />;
};

const CustomLeftOutlined = ({ currentSlide, slideCount, ...props }: any) => {
  return <LeftOutlined {...props} />;
};


const Carousel = ({
  slidesToShow = 4,
  arrows = true,
  nextArrow = <CustomRightOutlined />,
  prevArrow = <CustomLeftOutlined />,
  dots = false,
  infinite = false,
  responsive = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
  children,
}: CarouselProps) => {
  return (
    <AntdCarousel
      slidesToShow={slidesToShow}
      arrows={arrows}
      nextArrow={nextArrow}
      prevArrow={prevArrow}
      dots={dots}
      infinite={infinite}
      responsive={responsive}
    >
      {children}
    </AntdCarousel>
  );
};

export default Carousel;
