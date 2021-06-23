import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { restaurantTypes, restaurantSorts } from "../../utils/constants";
import SearchBar from "../../components/SearchBar/index";
import Tag from "../../components/Tag/index";
import { Row, Col } from "react-bootstrap";
import { RestaurantContext } from "../../context/RestaurantContext";
import { getPlaces } from "../../api/placeApi";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function RestaurantSearch() {
  const classes = useStyles();

  const [curType, setCurType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [textsearch, setTextSearch] = useState("");

  const {
    restaurants,
    paramsContext,
    loadings,
    restaurantContext,
  } = useContext(RestaurantContext);
  const [list, setList] = restaurants;
  const [params, setParams] = paramsContext;
  const [loading, setLoading] = loadings;
  const [restaurant, setRestaurant] = restaurantContext;
  const updateList = () => {
    setRestaurant(null);
    setParams({
      sortby: sortBy,
      type: curType,
      textsearch: textsearch,
    });
    setLoading(true);
    getPlaces(
      {
        sortby: sortBy,
        type: curType,
        textsearch: textsearch,
      },
      1,
      15
    )
      .then((res) => {
        setLoading(false);
        setList(res.data.data.places);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const handleClick = (newValue, value, setValue) => {
    if (newValue === value) {
      setValue(null);
    } else {
      setValue(newValue);
    }
  };

  return (
    <div>
      <Row>
        <SearchBar
          onChange={(e) => setTextSearch(e.target.value)}
          onClick={updateList}
        />
      </Row>
      <Row>
        <br></br>
      </Row>
      <Row>Chọn loại nhà hàng</Row>
      <Row className="mt-3">
        {restaurantTypes.map((type) => (
          <Tag
            bgColor={curType === type.key ? "#FFA500" : "#C4C4C4"}
            textColor={curType === type.key ? "#FFF" : "#000"}
            text={type.value}
            onClick={() => handleClick(type.key, curType, setCurType)}
          />
        ))}
      </Row>
      <Row>Sắp xếp theo</Row>
      <Row className="mt-3">
        {restaurantSorts.map((type) => (
          <Tag
            bgColor={sortBy === type.key ? "#FFA500" : "#C4C4C4"}
            textColor={sortBy === type.key ? "#FFF" : "#000"}
            text={type.value}
            onClick={() => handleClick(type.key, sortBy, setSortBy)}
          />
        ))}
      </Row>
    </div>
  );
}
