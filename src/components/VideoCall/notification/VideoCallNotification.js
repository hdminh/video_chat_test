import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { VideoCallContext } from "../../../context/VideoCallContext";
import firebase from "firebase/app";
import "firebase/messaging";
import { Howl } from "howler";
import ringtone from "../../../Sounds/ringtone.mp3";

const ringtoneSound = new Howl({
  src: [ringtone],
  loop: true,
  preload: true,
});

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: "none",
  },
}));

export default function VideoCallNotification() {
  const classes = useStyles();
  const {
    connectSocket,
    joinCall,
    answerCall,
    call,
    callEnded,
    leaveCall,
    isCalling,
    setIsCalling,
    rejectCall,
  } = useContext(VideoCallContext);
  const [caller, setCaller] = React.useState({});
  const [callAccepted, setCallAccepted] = useState(false);

  const messaging = firebase.messaging();

  const receiveVideoCall = (payload) => {
    const data = JSON.parse(payload.data.stringdata);
    setCaller(data.caller);
    setCallAccepted(false);
    ringtoneSound.play();
    connectSocket().then(() => joinCall(data.caller._id));
  };

  messaging.onMessage((payload) => {
    console.log("Message received", payload);
    if (payload.notification.body === "9") {
      receiveVideoCall(payload);
    }
  });

  const handleAnswer = () => {
    ringtoneSound.stop();
    setCallAccepted(true);
    setIsCalling(false);
  };

  const handleReject = () => {
    ringtoneSound.stop();
    setIsCalling(false);
    rejectCall();
  }

  return (
    <div>
      {callAccepted && (
        <Redirect to={"/video-call?type=receiver&id=" + caller._id} />
      )}
      <Dialog
        className={classes.root}
        open={isCalling}
        onClose={() => handleAnswer(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có cuộc gọi đến"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {caller.lastname} {"đang gọi bạn"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleReject()}
            color="primary"
            startIcon={<CallEndIcon color={"secondary"} />}
          >
            Decline
          </Button>
          <Button
            onClick={() => handleAnswer()}
            color="primary"
            autoFocus
            startIcon={<VideocamRoundedIcon color={"primary"} />}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
