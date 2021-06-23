import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { getComment } from "../../../api/placeApi";
import { Row, Col } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import Review from "./Review";
import Info from "./Info";
import Maps from "./Maps";
import PageLoading from "../../PageLoading/pageLoading";
import Tag from "../../Tag/index";
import { restaurantInfoTabs } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    backgroundColor: theme.palette.background.paper,
    color: "black",
    width: "100%",
  },
}));

export default function RestaurantInfo() {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const { restaurantContext, loadings } = useContext(RestaurantContext);
  const [restaurant, setRestaurant] = restaurantContext;
  const [loading, setLoading] = loadings;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    setLoading(true);
    getComment(restaurant._id)
      .then((res) => {
        setComments(res.data.data.comments);
        console.log(res.data.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClick = (newIndex) => {
    setIndex(newIndex);
    console.log(index);
  };
  return (
    <div>
      {loading ? (
        <PageLoading />
      ) : (
        restaurant && (
          <div>
            <Row>
              <Col sm={1}>
                <IconButton
                  aria-label="Tìm kiếm"
                  onClick={() => setRestaurant(null)}
                >
                  <ArrowBackIosRoundedIcon fontSize="small" />
                </IconButton>
              </Col>
              <Col sm={10}>
                <h2> {restaurant.name} </h2>
              </Col>
              <Row style={{marginLeft: "2vh"}}>
                {restaurantInfoTabs &&
                  restaurantInfoTabs.map((type) => (
                    <Tag
                      bgColor={index === type.index ? "#FFA500" : "#C4C4C4"}
                      textColor={index === type.index ? "#FFF" : "#000"}
                      text={type.value}
                      onClick={() => handleClick(type.index)}
                    />
                  ))}
              </Row>
            </Row>
            <Row>
              <Col sm={12}>{index === 0 && <Info />}</Col>
              <Col sm={12}>{index === 1 && <Review comments={comments} />}</Col>
              <Col sm={12}>{index === 2 && <Maps />}</Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
}
