import React from "react";
import Slider from "react-slick";
import RestaurantCard from "./RestaurantCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecommendList(props) {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  return (
    <div>
      <Slider {...settings}>
        {props.recommendList &&
          props.recommendList.map((recommend) => (
            <div>
              <RestaurantCard restaurantCard={recommend} />
            </div>
          ))}
      </Slider>
    </div>
  );
}
