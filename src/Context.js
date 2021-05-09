import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:8080');
// const socket = io('https://togetherapis.herokuapp.com/videocall');

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

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log('myVideo', currentStream);
        myVideo.current.srcObject = currentStream;
      });
  }, []);

  const connectSocket = (token, id) => {
    setMe(id);
    socket.current = io('https://togetherapis.herokuapp.com/videocall', {
      transports: ['websocket'],
      query: { token },
    });
    console.log('socket connected!', id);
    socket.current.on('server_send_offer', ({ callerId, offer }) => {
      console.log('server send offer', { callerId, offer });
      setCall({ isReceivingCall: true, from: callerId, signal: offer });
    });
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('client answer', data);
      offerRef.current = data;
      socket.current.emit('client_answer', { callerId: call.from, isaccpeted: true, answer: data });
    });

    peer.on('stream', (currentStream) => {
      console.log('client answer stream', currentStream);
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    setReceiver(id);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('client make call', data);
      offerRef.current = data;
      socket.current.emit('client_make_call', { receiverId: id });
    });

    peer.on('stream', (currentStream) => {
      console.log('caller stream', currentStream);
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on('server_send_receiver_online', () => {
      console.log('server send receiver online');
      console.log('client send offer', offerRef.current);
      socket.current.emit('client_send_offer', { offer: offerRef.current });
    });

    socket.current.on('server_send_answer', (data) => {
      console.log('server send answer', data.answer);
      setCallAccepted(true);
      peer.signal(data.answer);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    console.log('end call');
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
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
