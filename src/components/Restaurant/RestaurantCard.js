import React, {useContext} from "react";
import {Card, Row, Col} from "react-bootstrap";
import {RestaurantContext} from "../../context/RestaurantContext";
import Stars from "../Restaurant/Stars";

export default function RestaurantCard({restaurantCard, width}) {
  const {restaurantContext} = useContext(RestaurantContext);
  const [restaurant, setRestaurant] = restaurantContext;
  const handleClick = () => {
    setRestaurant(restaurantCard);
  };

  return (
    <div className="restaurant-card" style={width ? {width: width} : {}}>
      {restaurantCard && (
        <Card
          className="restaurant-item"
          onClick={handleClick}
          style={
            restaurantCard.photos && restaurantCard.photos[0] ?
              {
                backgroundImage: "url(" + restaurantCard.photos[0] + ")"
              } :
              {
                backgroundImage: "url(\"https://i.stack.imgur.com/y9DpT.jpg\")"
              }
          }
        >
          <Row className="restaurant-card-star">
            <Stars rating={restaurantCard.rating}/>
          </Row>
          <Row className="overlay">
            <Col sm={12}>
              <p className="restaurant-card-name-overlay">{restaurantCard.name}</p>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}
