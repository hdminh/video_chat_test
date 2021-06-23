import socketIOClient from "socket.io-client";
import React, { useEffect, useState, useRef } from 'react';

const useChat = (matchId, listMessage) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    useEffect(() => {
        setMessages(listMessage);
    }, [listMessage])
    useEffect(() => {
        socketRef.current = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
            transports: ["websocket"],
            query: { token },
        });
        socketRef.current.emit("client_join_chat", {
            roomId: matchId,
        },
            (res) => {
                console.log("Join chat res", res);
            });

        socketRef.current.on("server_sent_chat", (message) => {
            console.log("receive", message);

            const incommingMessage = {
                data: [
                    {message: message.data.message}
                ],
                sender: message.id,
                created: message.created
            }
            console.log("receive", incommingMessage);


            setMessages((messages) => [...messages, incommingMessage]);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [matchId]);
    const sendMessage = (messageBody) => {
        socketRef.current.emit("client_sent_chat", {
            message: messageBody,
            type: "text",
            roomId: matchId,
        }, (res) => {
            console.log(res);
        })
        const userId = localStorage.getItem("userid");
        const sendingMessage = {
            data: [
                {message: messageBody}
            ],
            sender: userId,
            created: Date.now(),
        }

        setMessages((messages) => [...messages, sendingMessage]);

    }

    return {
        messages,
        sendMessage
    }

}

export default useChat;

