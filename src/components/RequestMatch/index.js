import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from "firebase/app";
import "firebase/messaging";
import { useHistory } from "react-router-dom";
// component
import LoadingSVG from '../../assets/images/Rolling-1s-35px.svg';
// api
import { matchNow, cancelRequestMatch } from '../../api/matchApi';
import LocationContext from '../../context/LocationContext';
import MatchContext from '../../context/MatchContext';

const TIME_REQUEST = 30000;
// Hàm gửi yêu cầu ghép đôi
// Hàm huỷ yêu cầu




export default function RequestMatch(props) {
    const [isRequestMatch, setIsRequestMatch] = useState(false);
    const locationContext = useContext(LocationContext);
    const matchContext = useContext(MatchContext);
    let history = useHistory();


    const messaging = firebase.messaging();

    const receiveNotificationFoundMatch = (payload) => {
        const data = JSON.parse(payload.data.stringdata);
        const userMatched = data.user2;
        matchContext.setMatchInfor({
            fullname: `${userMatched.lastname} ${userMatched.firstname}`,
             avatar: userMatched.avatar[0],
             notificationid: data.notificationid,
             timeout: data.timeout
        });
        matchContext.setIsProcessMatching(true);

        setIsRequestMatch(false);
    }

    const receiveNotificationMatched = (payload) => {
        setIsRequestMatch(false);
        const data = JSON.parse(payload.data.stringdata);
        const matchId = data.matchId;
        if(matchId!=="")
            history.push(`/messages/${matchId}`);
    }

    /**
     * Listening the notification for match now
    */
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // if body equal 1, web will pop up modal

        switch (payload.notification.body) {
            case "1":
                receiveNotificationFoundMatch(payload);
                break;
            case "3":
                receiveNotificationMatched(payload);
                break;


        }


    });

    /**
     * Request match now handler
     */
    const requestMatchNowHandler = async () => {
        let dataMatchNowBody = props.matchNowBody;
        dataMatchNowBody.lat = locationContext.location.latitude;
        dataMatchNowBody.long = locationContext.location.longitude;
        console.log(locationContext);
        await matchNow({ lat: 50, long: 100 })
            .then((response) => {
                if (response.status === 200) { // Đã nhận yêu cầu
                    setIsRequestMatch(true)
                } else {
                    setIsRequestMatch(false);
                }
            })
            .catch((error) => {
                console.error("Request match now", error, error.message);
                setIsRequestMatch(false);
            })

    }

    /**
     * Cancel request match (now and later) handler
     */
    const cancelRequestMatchHandler = async () => {
        setIsRequestMatch(false);
        await cancelRequestMatch()
            .then((response) => {
                if (response.status === 200) { // Đã nhận yêu cầu
                    setIsRequestMatch(false);
                } else {
                    setIsRequestMatch(true);
                }
            })
            .catch((error) => {
                console.error("Cancel request match", error, error.message);
                setIsRequestMatch(true);
            })
    }




    return (
        <React.Fragment>
            {/* <div className="content-container"> */}
            <Row className="mt-1">
                <div className="find-object">
                    <div className="btn-function__size70">
                        <button type="button" onClick={!isRequestMatch ? requestMatchNowHandler : cancelRequestMatchHandler}>
                            {isRequestMatch === false
                                ? <FontAwesomeIcon icon="search" size="2x" color="#FFF" style={{ marginTop: '20px' }} />
                                : <img src={LoadingSVG} style={{ marginTop: '17px' }} alt="" />}
                        </button>
                    </div>
                </div>
            </Row>
            {/* </div> */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </React.Fragment>
    )
}