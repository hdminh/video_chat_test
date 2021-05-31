import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [receiver, setReceiver] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const offerRef = useRef();
  const socket = useRef();
  const candidateRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        console.log('my video', myVideo.current);
      });
  }, []);

  const sendAnswer = () => {
    connectionRef.current
      .setRemoteDescription(new RTCSessionDescription(call.signal))
      .then(() => connectionRef.current.createAnswer())
      .then((answer) => connectionRef.current.setLocalDescription(answer))
      .then(() => {
        console.log('client_answer');
        socket.current.emit('client_answer', {
          callerId: call.from._id,
          isaccpeted: true,
          answer: connectionRef.current.localDescription,
        });
      })
      .catch((err) => {
        console.log('Error in client_answer');
        console.error(err);
      });
  };

  const connectSocket = (token, id) => {
    setMe(id);
    socket.current = io('https://togetherapis.herokuapp.com/videocall', {
      transports: ['websocket'],
      query: { token },
    });

    console.log('socket connected!', id);
    socket.current.on('server_send_offer', ({ caller, offer }) => {
      console.log('server_send_offer', caller, offer);
      setCall({ isReceivingCall: true, from: caller, signal: offer });
    });
  };

  const gotRemoteTrack = (event) => {
    const remoteVideo = userVideo.current;
    if (remoteVideo.srcObject !== event.streams[0]) {
      const [streamObj] = event.streams;
      remoteVideo.srcObject = streamObj;
      console.log('gotRemoteTrack', streamObj);
    }
  };

  const handleICEConnectionStateChangeEvent = () => {
    switch (connectionRef.current.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        connectionRef.current.close();
        break;
      default:
    }
  };

  const handleSignalingStateChangeEvent = () => {
    switch (connectionRef.current.signalingState) {
      case 'closed':
        connectionRef.current.close();
        break;
      default:
    }
  };

  const handleOnTrack = (trackEvent) => {
    console.log('track', trackEvent);
    const remoteMediaStream = trackEvent.streams[0];
    userVideo.current.srcObject = remoteMediaStream;
    console.log('remote_video', userVideo.current.srcObject);
  };

  const answerCall = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
    });
    connectionRef.current = peer;
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    setCallAccepted(true);
    sendAnswer();
    peer.onicecandidate = (rtcPeerConnectionIceEvent) => {
      console.log('candidate', rtcPeerConnectionIceEvent);
      if (rtcPeerConnectionIceEvent.candidate) {
        candidateRef.current = rtcPeerConnectionIceEvent.candidate;
      }
    };

    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // connectionRef.current.onnegotiationneeded = handleNegotiationNeededEvent;
    peer.onaddtrack = gotRemoteTrack;
    peer.ontrack = handleOnTrack;

    socket.current.on('server_send_candidate', ({ candidate }) => {
      console.log('server_send_candidate', candidate);
      peer.addIceCandidate(new RTCIceCandidate(candidate));
      const myCandidate = candidateRef.current;
      console.log('client_candidate', myCandidate);
      socket.current.emit('client_candidate', { candidate: myCandidate });
    });
  };

  const callUser = (id) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
    });
    connectionRef.current = peer;
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    setReceiver(id);
    console.log('client_make_call');
    socket.current.emit('client_make_call', { receiverId: id });

    peer.onicecandidate = (rtcPeerConnectionIceEvent) => {
      console.log('candidate', rtcPeerConnectionIceEvent);
      if (rtcPeerConnectionIceEvent.candidate) {
        candidateRef.current = rtcPeerConnectionIceEvent.candidate;
      }
    };

    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // this.peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    peer.onaddtrack = gotRemoteTrack;
    peer.ontrack = handleOnTrack;

    socket.current.on('server_send_receiver_online', () => {
      console.log('server_send_receiver_online');
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
          console.log('client_send_offer');
          socket.current.emit('client_send_offer', { offer: offerRef.current });
        })
        .catch((err) => {
          console.log('Error in client_send_offer');
          console.error(err);
        });
    });

    socket.current.on('server_send_answer', (data) => {
      console.log('server_send_answer', data);
      setCallAccepted(true);
      peer
        .setRemoteDescription(new RTCSessionDescription(data.answer))
        .then(() => {
          const candidate = candidateRef.current;
          console.log('client_candidate', candidate);
          socket.current.emit('client_candidate', { candidate });
        })
        .catch((err) => {
          console.log('Error in server_send_answer');
          console.error(err);
        });
    });

    socket.current.on('server_send_candidate', ({ candidate }) => {
      console.log('server_send_candidate', candidate);
      connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        receiver,
        setReceiver,
        me,
        setMe,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        connectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
