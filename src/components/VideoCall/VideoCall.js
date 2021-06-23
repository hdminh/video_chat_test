import React, { useEffect, useContext, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  VideoCallProvider,
  VideoCallContext,
} from "../../context/VideoCallContext";
import "./VideoCall.css";
import { IconButton } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import { Howl } from "howler";
import ringtone from "../../Sounds/callingSound.mp3";

const callingSound = new Howl({
  src: [ringtone],
  loop: false,
  preload: true,
});

const Watermark = React.lazy(() => import("../Watermark/Watermark"));

export default function VideoCall() {
  const {
    call,
    myVideo,
    userVideo,
    stream,
    setStream,
    callUser,
    answerCall,
    leaveCall,
    connectSocket,
    createPeer,
  } = useContext(VideoCallContext);
  const [videoMuted, setVideoMuted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const partnerId = query.get("id");
  const type = query.get("type");

  useEffect(() => {
    connectSocket().then(() => {
      switch (type) {
        case "caller":
          callUser(partnerId);
          break;
        case "receiver":
          answerCall(true);
          break;
        default:
          getUserStream();
      }
    });
  }, []);

  const getUserStream = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        return currentStream;
      });
  };

  const toggleMuteAudio = () => {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
    }
  };

  const toggleMuteVideo = () => {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
    }
  };

  const UserVideo = myVideo && (
    <video className="userVideo" playsInline muted ref={myVideo} autoPlay />
  );

  const PartnerVideo = userVideo && (
    <video className="partnerVideo" playsInline ref={userVideo} autoPlay />
  );

  const audioControl = (
    <IconButton color="primary" aria-label="Audio control" component="span">
      {!audioMuted ? (
        <MicIcon onClick={toggleMuteAudio} />
      ) : (
        <MicOffIcon onClick={toggleMuteAudio} />
      )}
    </IconButton>
  );

  const videoControl = (
    <IconButton color="primary" aria-label="Video control" component="span">
      {!videoMuted ? (
        <VideocamIcon onClick={toggleMuteVideo} />
      ) : (
        <VideocamOffIcon onClick={toggleMuteVideo} />
      )}
    </IconButton>
  );

  const hangUp = (
    <IconButton
      color="secondary"
      aria-label="Hang up"
      component="span"
      onClick={leaveCall}
    >
      <CallEndIcon />
    </IconButton>
  );

  return (
    <div className="callContainer" style={{ display: "block" }}>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Watermark avatar={call.from?.avatar} name={call.from?.lastname} />
      </Suspense> */}
      <div className="partnerVideoContainer">{PartnerVideo}</div>
      <div className="userVideoContainer">{UserVideo}</div>
      <div className="controlsContainer flex">
        {audioControl}
        {videoControl}
        {hangUp}
      </div>
    </div>
  );
}
