import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Stars from "../Stars";
import { Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { RestaurantContext } from "../../../context/RestaurantContext";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import CommentDialog from "./CommentDialog";

const useStyles = makeStyles((theme) => ({
  comment: {
    width: window.width,
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { restaurantContext, dialogContext } = useContext(RestaurantContext);
  const [restaurant] = restaurantContext;
  const [open, setOpen] = dialogContext;

  const getSecondaryText = (comment) => {
    let text;
    let day = new Date(comment.created_comment).getDate();
    let month = new Date(comment.created_comment).getMonth() + 1;
    text =
      day + "/" + month + " - " + comment.firstname + " " + comment.lastname;
    return text;
  };

  const handleComment = () => {
    setOpen(true);
  };

  return (
    <div>
      <CommentDialog />
      <Row>
        <Col>
          <IconButton
            type="submit"
            aria-label="Bình luận"
            onClick={handleComment}
          >
            {"Để lại đánh giá của bạn...  "}
          </IconButton>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "5vh",
            marginTop: "2vh"
          }}
        >
          {Math.round(restaurant.rating * 10) / 10} / 5{" "}
          <Stars rating={restaurant.rating} /> ({restaurant.user_ratings_total})
        </Col>
      </Row>
      <Divider />
      {props.comments && (
        <List style={{ maxHeight: "65vh", overflow: "auto" }}>
          {props.comments.map((comment) => {
            return (
              <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={comment.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.comment}
                    secondary={getSecondaryText(comment)}
                  />
                  <ListItemSecondaryAction>
                    <Stars rating={comment.rating} />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
        </List>
      )}
    </div>
  );
}
