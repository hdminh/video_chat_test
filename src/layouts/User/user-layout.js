import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalMatch from "../../components/ModalMatch/index";
import VideoCallNotification from "../../components/VideoCall/notification/VideoCallNotification";
import Sidebar from "./Sidebar/index";
import LocationContext from "../../context/LocationContext";
import MatchContext from "../../context/MatchContext";
import { VideoCallProvider } from "../../context/VideoCallContext";
import { LoadingProvider } from "../../context/LoadingContext";
// Hàm gọi api save firebase token
const saveFirebaseToken = async () => {
  let data = { tokenid: localStorage.getItem("firebaseToken") };
  await axios
    .post("https://togetherapis.herokuapp.com/api/v1/firebase", data, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function UserLayout(props) {
  let history = useHistory();
  // check login
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token == null) {
      history.push("/login");
    }
    saveFirebaseToken();
  }, []);

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [isProcessMatching, setIsProcessMatching] = useState(false);
  const [matchInfor, setMatchInfor] = useState({});

  function success(pos) {
    var crd = pos.coords;
    setLocation({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    getLocationHandler();
  }, []);

  const setIsProcessMatchingHandler = (isProcess) => {
    setIsProcessMatching(isProcess);
  };

  const setMatchInforHandler = (matchInfor) => {
    setMatchInfor({
      fullname: matchInfor.fullname,
      avatar: matchInfor.avatar,
      notificationid: matchInfor.notificationid,
      timeout: matchInfor.timeout,
    });
  };

  return (
    <LoadingProvider>
      <MatchContext.Provider
        value={{
          isProcessMatching: isProcessMatching,
          matchInfor: matchInfor,
          setIsProcessMatching: setIsProcessMatchingHandler,
          setMatchInfor: setMatchInforHandler,
        }}
      >
        <LocationContext.Provider value={{ location: location }}>
          <VideoCallProvider>
            <React.Fragment>
              <Container fluid>
                <Row>
                  {/* Begin sidebar LEFT */}
                  <Col sm={1} style={{ padding: "0px" }}>
                    <Sidebar />
                  </Col>
                  {/* End sidebar LEFT */}
                  {props.children}
                </Row>
                <ModalMatch
                  isProcessMatching={isProcessMatching}
                  setIsProcessMatching={setIsProcessMatching}
                  userInformMatch={matchInfor}
                />
                <VideoCallNotification />
              </Container>
            </React.Fragment>
          </VideoCallProvider>
        </LocationContext.Provider>
      </MatchContext.Provider>
    </LoadingProvider>
  );
}
