import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { RestaurantContext, RestaurantProvider } from "../../context/RestaurantContext";
import RestaurantList from "../../components/Restaurant/RestaurantList";
import RestaurantSearch from "../../components/Restaurant/RestaurantSearch";
import RestaurantInfo from "../../components/Restaurant/RestaurantInfo/RestaurantInfo";
import {Divider} from "@material-ui/core";

export default function Restaurant() {
  return (
    <RestaurantProvider>
      <RestaurantChild />
    </RestaurantProvider>
  );
}

function RestaurantChild() {
  const { restaurantContext } = useContext(RestaurantContext);
  const [restaurant] = restaurantContext;
  return (
    <React.Fragment>
      <Col sm={3} style={{ padding: "0px" }}>
        <div className="container-fluid info-container">
          <RestaurantSearch />
        </div>
      </Col>
      <Divider />
      <Col sm={8}>
        <div className="container-fluid info-container">
          {restaurant ? <RestaurantInfo /> : <RestaurantList />}
        </div>
      </Col>
    </React.Fragment>
  );
}
