import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import useChat from "./useChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
// component
import MessageItem from "../../components/MessageItem/index";
import { getChat } from "../../api/matchApi";
import { LoadingContext } from "../../context/LoadingContext";
const PrivateMessage = (props) => {
  const loadingContext = useContext(LoadingContext);
  const params = useParams();
  const messagesEndRef = React.createRef();
  const matchId = params.matchId;
  const [userChatInform, setUserChatInform] = useState({
    firstname: "",
    lastname: "",
    avatar: [],
  });

  const [listMessage, setListMessage] = useState([]);
  /**
   * Custom hook, handle send chat and receive new message
   */
  const { messages, sendMessage } = useChat(matchId, listMessage);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isCallUser, setIsCallUser] = useState(false);
  /**
   * Get list message
   */
  useEffect(() => {
    if (props.listMatch.length !== 0) {
      const matchItem = props.listMatch.find(
        (element) => element._id === matchId
      );
      const userid = localStorage.getItem("userid");
      const userInform = matchItem.participants.find(
        (element) => element._id === userid
      );
      loadingContext.setIsLoading(true);
      setUserChatInform(userInform);
      getChat({ matchId: matchId })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            setListMessage(res.data.data.reverse());
            loadingContext.setIsLoading(false);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.listMatch, matchId]);

  /**
   * JSX list message
   */
  const messageHandler = messages.map((element) => {
    const message = element.data;
    const userid = localStorage.getItem("userid");
    const isMine = element.sender === userid;
    let time = new Date(element.created);
    return (
      <MessageItem
        key={element.created}
        text={message}
        title={time.toString()}
        sender={isMine ? "mine" : ""}
      />
    );
  });

  /**
   * Auto scrool when having new message
   */
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Send chat handler
   * @param {Event} e
   */
  const sendChatClickHandler = (e) => {
    e.preventDefault();
    sendMessage(currentMessage);
    setCurrentMessage("");
  };

  /**
   *
   * Video call
   */
  const callUser = () => {
    console.log("user", localStorage.getItem("userid"));
    setIsCallUser(true);
  };

  return (
    <React.Fragment>
      {isCallUser && (
        <Redirect
          to={"/video-call?type=caller&id=" + userChatInform._id}
        />
      )}
      <div className="content scrollable">
        <div className="toolbar-msg d-flex">
          <div className="d-flex flx-1">
            <div style={{ position: "relative" }}>
              <div className="avatar-msg avatar-msg--m ">
                <img
                  className="avatar-img outline"
                  alt=""
                  src={userChatInform.avatar[0]}
                />
              </div>
            </div>
            <div className="msg-header-title">
              <div className="d-flex align-items-center main-title-container">
                <div className="title header-title d-flex align-items-center">{`${userChatInform.firstname} ${userChatInform.lastname}`}</div>
              </div>
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <div className="subtitle header-subtitle">
                    <span>
                      <span data-translate-inner="STR_LAST_SEEN">Truy cập</span>
                      <span>
                        {" "}
                        24{" "}
                        <span data-translate-inner="STR_MIN_AGOS">
                          phút trước
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="icon-outline-cog mr-3">
              <FontAwesomeIcon icon="cog" size="2x" color="#FFA500" />
            </div>
            <div className="icon-outline-video mr-3">
              <FontAwesomeIcon
                icon="video"
                size="2x"
                color="#FFA500"
                onClick={callUser}
              />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="chat-view">
          {messageHandler}
          <div ref={messagesEndRef} />
        </div>
        <form>
          <div className="compose">
            <input
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              value={currentMessage}
              type="text"
              className="compose-input"
              placeholder="Type a message, @name"
            />
            <div className="compose-btn">
              <button onClick={sendChatClickHandler} type="submit">
                <FontAwesomeIcon icon="paper-plane" size="1x" color="#FFA500" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PrivateMessage;
