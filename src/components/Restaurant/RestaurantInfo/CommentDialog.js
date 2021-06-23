import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { RestaurantContext } from "../../../context/RestaurantContext";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import styled from "styled-components";
import { addComment } from "../../../api/placeApi";

const StyledRate = styled(Rate)`
  &.rc-rate {
    font-size: ${({ size }) => size}px;
  }
`;

export default function CommentDialog() {
  const { dialogContext, restaurantContext } = React.useContext(
    RestaurantContext
  );
  const [open, setOpen] = dialogContext;
  const [restaurant] = restaurantContext;
  const [input, setInput] = useState("");
  const [star, setStar] = useState(0);

  const handleComment = () => {
    if (star === 0) {
    } else {
        console.log(star)
      let data = {
        id: restaurant._id,
        rating: star,
        comment: input,
      };
      addComment(data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
      setStar(0);
      setInput("")
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Bạn đánh giá sao về nhà hàng này?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn đánh giá bao nhiêu sao?</DialogContentText>
            <StyledRate size={24} defaultValue={star} onChange={(value) => setStar(value)} />
            <DialogContentText>Bạn nghĩ gì về nhà hàng này?</DialogContentText>
            <TextField
              margin="dense"
              id="comment"
              label="Bình luận"
              type="text"
              fullWidth
              onChange={(event) => setInput(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <IconButton
              type="submit"
              aria-label="search"
              onClick={handleComment}
            >
              <SendRoundedIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
