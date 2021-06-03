import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const peer = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    // {
    //   urls: 'turn:relay.backups.cz',
    //   credential: 'webrtc',
    //   username: 'webrtc',
    // },
    // {
    //   urls: 'turn:relay.backups.cz?transport=tcp',
    //   credential: 'webrtc',
    //   username: 'webrtc',
    // },
    // {
    //   urls: 'turn:numb.viagenie.ca',
    //   credential: 'muazkh',
    //   username: 'webrtc@live.com',
    // },
    // {
    //   urls: 'turn:192.158.29.39:3478?transport=udp',
    //   credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //   username: '28224511:1379330808',
    // },
    // {
    //   urls: 'turn:192.158.29.39:3478?transport=tcp',
    //   credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //   username: '28224511:1379330808',
    // },
    // {
    //   urls: 'turn:turn.bistri.com:80',
    //   credential: 'homeo',
    //   username: 'homeo',
    // },
    // {
    //   url: 'turn:turn.anyfirewall.com:443?transport=tcp',
    //   credential: 'webrtc',
    //   username: 'webrtc',
    // },
  ],
});

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [receiver, setReceiver] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [flag, setFlag] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
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
    peer
      .setRemoteDescription(new RTCSessionDescription(call.signal))
      .then(() => peer.createAnswer())
      .then((answer) => peer.setLocalDescription(answer))
      .then(() => {
        console.log('client_answer', peer.localDescription);
        socket.current.emit('client_answer', {
          callerId: call.from._id,
          isaccpeted: true,
          answer: peer.localDescription,
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

  // const gotRemoteTrack = (event) => {
  //   const remoteVideo = userVideo.current;
  //   if (remoteVideo.srcObject !== event.streams[0]) {
  //     const streamObj = event.streams[0];
  //     remoteVideo.srcObject = streamObj;
  //     console.log('gotRemoteTrack', streamObj);
  //   }
  // };

  const handleICEConnectionStateChangeEvent = () => {
    switch (peer.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        peer.close();
        break;
      default:
    }
  };

  const handleSignalingStateChangeEvent = () => {
    switch (peer.signalingState) {
      case 'closed':
        peer.close();
        break;
      default:
    }
  };

  const handleIceCandidateEvent = (e) => {
    console.log('candidate', e);
    if (e.candidate) {
      if (candidateRef.current) {
        candidateRef.current.push(e.candidate);
      } else {
        candidateRef.current = Array.of(e.candidate);
      }
      // socket.current.emit('client_candidate', { candidate: e.candidate });
    }
  };

  const handleOnTrack = (trackEvent) => {
    console.log('track', trackEvent);
    const remoteMediaStream = trackEvent.streams[0];
    userVideo.current.srcObject = remoteMediaStream;
    console.log('remote_video', userVideo.current.srcObject);
  };

  const answerCall = () => {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    setCallAccepted(true);
    sendAnswer();
    peer.onicecandidate = handleIceCandidateEvent;
    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // peer.onnegotiationneeded = handleNegotiationNeededEvent;
    // peer.onaddtrack = gotRemoteTrack;
    peer.ontrack = handleOnTrack;

    socket.current.on('server_send_candidate', ({ candidate }) => {
      console.log('server_send_candidate', candidate);
      peer.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => {
          if (flag) {
            candidateRef.current.forEach((candidateA) => {
              socket.current.emit('client_candidate', { candidate: candidateA });
            });
          }
          setFlag(false);
        });
    });
  };

  const callUser = (id) => {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    setReceiver(id);
    console.log('client_make_call');
    socket.current.emit('client_make_call', { receiverId: id });

    peer.onicecandidate = handleIceCandidateEvent;
    peer.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peer.onsignalingstatechange = handleSignalingStateChangeEvent;
    // this.peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    // peer.onaddtrack = gotRemoteTrack;
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
          candidateRef.current.forEach((candidate) => {
            socket.current.emit('client_candidate', { candidate });
          });
        })
        .catch((err) => {
          console.log('Error in server_send_answer');
          console.error(err);
        });
    });

    socket.current.on('server_send_candidate', ({ candidate }) => {
      console.log('server_send_candidate', candidate);
      peer.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    peer.destroy();
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
