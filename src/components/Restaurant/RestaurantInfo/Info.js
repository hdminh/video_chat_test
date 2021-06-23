import React, { useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";

export default function Info() {
  const { restaurantContext } = useContext(RestaurantContext);
  const [restaurant, setRestaurant] = restaurantContext;
  let settings = {
    dots: true,
  };
  return (
    <div>
      {restaurant && (
        <div>
          <Row title="Địa chỉ">
            <Col sm={10}>
              <Row>{restaurant.address}</Row>

            </Col>
          </Row>
          <Row title="Hình ảnh">
            {restaurant.photos ? (
              <Slider {...settings}>
                {restaurant.photos.map((photo) => {
                  return (
                    <div>
                      <img
                        src={photo}
                        alt={restaurant.name}
                        style={{
                            maxHeight: "75vh",
                            margin: "auto"}}
                      ></img>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <p> Không có hình ảnh nào! </p>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}
