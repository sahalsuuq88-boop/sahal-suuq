"use client";

import React from "react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Parallax,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/parallax";

import { sliderData } from "../../data/dataSlider";
import HeroSlide from "./HeroSlider";

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Parallax]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={800}
        parallax={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full"
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <HeroSlide item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}