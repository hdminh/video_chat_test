import React, { createContext, useState, useRef, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { io } from "socket.io-client";

const VideoCallContext = createContext();

const peer = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      urls: "turn:relay.backups.cz",
      credential: "webrtc",
      username: "webrtc",
    },
    {
      urls: "turn:relay.backups.cz?transport=tcp",
      credential: "webrtc",
      username: "webrtc",
    },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
    {
      urls: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
    {
      urls: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
    {
      urls: "turn:turn.bistri.com:80",
      credential: "homeo",
      username: "homeo",
    },
    {
      url: "turn:turn.anyfirewall.com:443?transport=tcp",
      credential: "webrtc",
      username: "webrtc",
    },
  ],
});

const VideoCallProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [receiver, setReceiver] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [flag, setFlag] = useState(true);
  const [isCalling, setIsCalling] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const offerRef = useRef();
  const socket = useRef();
  const candidateRef = useRef();

  // useEffect(() => {
  //   console.log("useeffect context", socket.current);
  //   connectSocket();
  // });

  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "turn:relay.backups.cz",
        credential: "webrtc",
        username: "webrtc",
      },
      {
        urls: "turn:relay.backups.cz?transport=tcp",
        credential: "webrtc",
        username: "webrtc",
      },
      {
        urls: "turn:numb.viagenie.ca",
        credential: "muazkh",
        username: "webrtc@live.com",
      },
      {
        urls: "turn:192.158.29.39:3478?transport=udp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        urls: "turn:192.158.29.39:3478?transport=tcp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        urls: "turn:turn.bistri.com:80",
        credential: "homeo",
        username: "homeo",
      },
      {
        url: "turn:turn.anyfirewall.com:443?transport=tcp",
        credential: "webrtc",
        username: "webrtc",
      },
    ],
  });

  const handleIceCandidateEvent = (e) => {
    console.log("candidate", e);
    if (e && e.candidate) {
      if (candidateRef.current) {
        candidateRef.current.push(e.candidate);
      } else {
        candidateRef.current = Array.of(e.candidate);
      }
    }
  };

  const sendAnswer = () => {
    console.log("signal ref", offerRef.current);

    peer
      .setRemoteDescription(new RTCSessionDescription(offerRef.current))
      .then(() => peer.createAnswer())
      .then((answer) => peer.setLocalDescription(answer))
      .then(() => {
        console.log("client_answer");
        socket.current.emit("client_answer", {
          callerId: call.from._id,
          isaccpeted: true,
          answer: peer.localDescription,
        });
      })
      .catch((err) => {
        console.log("Error in client_answer");
        console.error(err);
      });
  };

  const connectSocket = async () => {
    const id = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    setMe(id);
    console.log("connect socket", id, token);
    socket.current = await io("https://togetherapis.herokuapp.com/videocall", {
      transports: ["websocket"],
      query: { token },
    });
    console.log("socket connected!", id);
    socket.current.on("server_send_offer", ({ caller, offer }) => {
      console.log("server_send_offer", caller, offer);
      offerRef.current = offer;
      console.log("offer", offerRef.current);
      setCall({ isReceivingCall: true, from: caller, signal: offer });
      setIsCalling(true);
    });
  };

  // const gotRemoteTrack = (event) => {
  //   const remoteVideo = userVideo.current;
  //   if (remoteVideo.srcObject !== event.streams[0]) {
  //     const [streamObj] = event.streams;
  //     remoteVideo.srcObject = streamObj;
  //   }
  //   console.log("remote_video", remoteVideo);
  // };

  // const gotRemoteStream = (event) => {
  //   userVideo.current.srcObject = event.stream;
  //   console.log("remote_video", userVideo.current);
  // };

  const handleICEConnectionStateChangeEvent = () => {
    switch (peer.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        peer.close();
        break;
      default:
    }
  };

  const handleSignalingStateChangeEvent = () => {
    switch (peer.signalingState) {
      case "closed":
        peer.close();
        break;
      default:
    }
  };

  const handleOnTrack = (trackEvent) => {
    console.log("track", trackEvent);
    if (trackEvent) {
      const remoteMediaStream = new MediaStream([trackEvent.track]);
      userVideo.current.srcObject = remoteMediaStream;
      console.log("remote_video", userVideo.current);
    }
  };

  const rejectCall = () => {
    socket.current.emit("client_answer", {
      callerId: call.from._id,
      isaccpeted: false,
      answer: "",
    });
  };

  const joinCall = (callerId) => {
    console.log("client join call");
    socket.current.emit("client_join_call_from_noti", { callerId: callerId });
  };

  const answerCall = () => {
    console.log("answerCall", peer);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        currentStream
          .getTracks()
          .forEach((track) => peer.addTrack(track, currentStream));
      });
    sendAnswer();

    peer.onicecandidate = handleIceCandidateEvent;
    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // this.peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    // peer.onaddtrack = gotRemoteTrack;
    // peer.onaddstream = gotRemoteStream;
    peer.ontrack = handleOnTrack;

    peer.addEventListener(
      "icecandidate",
      (ev) => {
        if (ev.candidate) {
          candidateRef.current = ev.candidate;
        }
      },
      false
    );

    socket.current.on("server_send_candidate", (data) => {
      console.log("server_send_candidate", data);
      peer.addIceCandidate(new RTCIceCandidate(data.candidate)).then(() => {
        if (flag) {
          candidateRef.current.forEach((candidateA) => {
            socket.current.emit("client_candidate", {
              candidate: candidateA,
            });
          });
        }
        setFlag(false);
      });
    });
  };

  const callUser = (id) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        currentStream
          .getTracks()
          .forEach((track) => peer.addTrack(track, currentStream));
      });
    setReceiver(id);
    console.log("client_make_call");
    socket.current.emit("client_make_call", { receiverId: id });

    peer.onicecandidate = handleIceCandidateEvent;
    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // this.peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    // peer.onaddtrack = gotRemoteTrack;
    // peer.onaddstream = gotRemoteStream;
    peer.ontrack = handleOnTrack;

    socket.current.on("server_send_receiver_online", () => {
      console.log("server_send_receiver_online");
      peer
        .createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
        .then((offer) => {
          peer.setLocalDescription(offer);
          offerRef.current = offer;
        })
        .then(() => {
          console.log("client_send_offer");
          socket.current.emit("client_send_offer", { offer: offerRef.current });
        })
        .catch((err) => {
          console.log("Error in client_send_offer");
          console.error(err);
        });
    });

    socket.current.on("server_send_answer", (data) => {
      console.log("server_send_answer", data);
      if (data.isaccpeted) {
        setCallAccepted(data.isaccpeted);
        peer
          .setRemoteDescription(new RTCSessionDescription(data.answer))
          .then(() => {
            candidateRef.current.forEach((candidate) => {
              socket.current.emit("client_candidate", { candidate });
            });
          })
          .catch((err) => {
            console.log("Error in server_send_answer");
            console.error(err);
          });
      } else {
        // leaveCall();
      }
    });

    socket.current.on("server_send_candidate", (data) => {
      console.log("server_send_candidate");
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    peer.destroy();
  };

  return (
    <VideoCallContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        receiver,
        setReceiver,
        me,
        setMe,
        isCalling,
        setIsCalling,
        callEnded,
        callUser,
        joinCall,
        leaveCall,
        rejectCall,
        answerCall,
        connectSocket,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};

export { VideoCallProvider, VideoCallContext };
