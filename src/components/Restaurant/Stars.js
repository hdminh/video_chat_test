import React from "react";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  star: {
    color: "#ffa500",
    width: "18px",
    height: "18px"
  }
}));

export default function Stars(props) {
  const classes = useStyle();
  const getStars = () => {
    let stars = [];
    for (let i = 0; i < Math.floor(props.rating); i++) {
      stars.push(<StarRoundedIcon className={classes.star} />);
    }
    if (Number(props.rating) > Math.floor(props.rating)) {
      stars.push(<StarHalfRoundedIcon className={classes.star} />);
    }
    let len = stars.length
    for (let i = 0; i < 5 - len; i++) {
      stars.push(<StarOutlineRoundedIcon className={classes.star} />);
    }
    return stars;
  };

  return <>{getStars()}</>;
}
