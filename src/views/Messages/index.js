import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, Route } from "react-router-dom";
// component
import ContactItem from "../../components/ContactItem/index";
import socketIOClient from "socket.io-client";
import PrivateMessage from "../../components/PrivateMessage/PrivateMessage";
import PageLoading from "../../components/PageLoading/pageLoading";
// API
import { getAllMatch } from "../../api/matchApi";
import { LoadingContext } from "../../context/LoadingContext";

export default function Message(props) {
  const [listMatch, setListMatch] = useState([]);
  const loadingContext = useContext(LoadingContext);
  const history = useHistory();
  const getAllMatchHanlder = async () => {
    await getAllMatch()
      .then((res) => {
        setListMatch(res.data.data);
        loadingContext.setIsLoading(false);
      })
      .catch((err) => {
        console.error("Get all match: ", err);
      });
  };

  useEffect(() => {
    loadingContext.setIsLoading(true);
    getAllMatchHanlder();
  }, []);

  const redirectMessagePrivateHandler = (matchId) => {
    history.push(`/messages/${matchId}`);
  };

  const listItemMessage = listMatch.map((element) => {
    return (
      <ContactItem
        key={element._id}
        matchInfor={element}
        onClick={() => {
          redirectMessagePrivateHandler(element._id);
        }}
      />
    );
  });
  return (
    <React.Fragment>
      {/* Start general information MIDDLE */}
      {loadingContext.isLoading && <PageLoading />}
      <Col sm={3} style={{ padding: "0px" }}>
        <div className="content scrollable">
          <div
            className="container-fluid info-container"
            style={{ border: "none" }}
          >
            <Row>
              <div className="heading-filter">
                <h3 className="heading-filter__fs15">Chats</h3>
              </div>
            </Row>
            <Row className="list-msg">{listItemMessage}</Row>
          </div>
          {/* <button onClick={test}>Test</button> */}
        </div>
      </Col>
      {/* Start content RIGHT */}
      <Col sm={8} style={{ padding: "0px" }}>
        {/* Header */}
        <Route path={`/messages/:matchId`}>
          <PrivateMessage listMatch={listMatch} />
        </Route>
      </Col>

      {/* End content RIGHT */}
      {/* End general information MIDDLE */}
    </React.Fragment>
  );
}
