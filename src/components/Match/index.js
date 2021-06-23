import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Card,
    Row,
    Col,
    Button,
    Container
} from 'react-bootstrap';
import axios from 'axios';
import firebase from "firebase/app";
import "firebase/messaging";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const TIME_REQUEST = 30;

export default function Match(props) {
    let history = useHistory();
    const [avatar, setAvatar] = useState('https://cdn.atomix.vg/wp-content/uploads/2020/09/one-piece.jpg');
    const [address, setAddress] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState(0);
    const [matchId, setMatchId] = useState('');
    // listen notification (-1 : cancel, 1: both confirm)
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        if (payload.notification.body === "2" && payload.data.result === "1") {
            console.log('thanh cong');
            history.push('/messages')
        } else if (payload.notification.body === "2" && payload.data.result === "-1") {
            console.log("that bai");
            props.setIsMatch(false);
            history.push('/encounters')
        }
        // redirect về trang tin nhắn
    });
    useEffect(() => {
        // get infor user match
        function getMatchInfo() {
            axios.get(process.env.REACT_APP_API_BASE_URL + '/match', {
                    headers: {
                        'auth-token': localStorage.getItem("token")
                    }
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            let dataMatch = response.data.data.matched; // data match
                            let dataStrangerInfo = response.data.data.strangerinfor;
                            if (dataMatch !== null && dataStrangerInfo != null) {
                                setMatchId(dataMatch._id);
                                // setAvatar(dataStrangerInfo.avatar);
                                setAddress(dataStrangerInfo.address);
                                setFirstname(dataStrangerInfo.firstname);
                                setLastname(dataStrangerInfo.lastname);
                                setGender(dataStrangerInfo.gender);
                            }
                        }
                    })
        }
        getMatchInfo();
    }, [])
    // call api confirm request
    async function confirmRequest(isConfirm) {
        console.log(matchId);
        if (matchId !== '') {
            let data = {
                matchid: matchId,
                status: isConfirm
            };
            await axios.patch(process.env.REACT_APP_API_BASE_URL + '/match/confirm', data, {
                headers: {
                    'auth-token': localStorage.getItem("token")
                }
            });
        }
    }

    // Cancel confirm and redirect view request match
    function redirectRequestMatch () {
        // send request confirm false
        confirmRequest(false);
        props.setIsMatch(false);
    }
    return (
        <React.Fragment>
            <Container >
                <Row className="mt-3">
                    <Col md={8}>
                        <Card style={{ border: 'none' }}>
                            {/* <Card.Img variant="top" src={avatar} className="avt-user-match"/>
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="warning" className="btn-circle btn-lg" onClick={ () => confirmRequest(true)}>
                                        <FontAwesomeIcon icon="check" size="1x" />
                                    </Button>
                                    <Button variant="secondary" className="btn-circle btn-lg" onClick={redirectRequestMatch}>
                                        <FontAwesomeIcon icon="times" size="1x" />
                                    </Button>
                                </div>
                            </Card.Body> */}
                        </Card>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h5 className="w3-opacity"><b>Thông tin cá nhân</b></h5>
                            <h6 className="w3-text-teal">Ho ten: { firstname } { lastname }</h6>
                            <h6 className="w3-text-teal">Gioi tinh: { gender === 0 ? 'Nam' : 'Nữ' }</h6>
                            <h6 className="w3-text-teal">Dia chi: { address }</h6>
                        </div>
                    </Col>
                </Row>
                <Row className="m-3">
                
            </Row>
            </Container>

            <Row>
                <Col sm={6}>
                    <div className="test">
                    <div className="d-flex justify-content-around">
                        <CountdownCircleTimer
                            isPlaying
                            duration={TIME_REQUEST}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                            onComplete={ () => {
                                confirmRequest(false);
                                props.setIsMatch(false);
                                return [false, 1000];
                            }}
                            >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                    <div className="d-flex justify-content-around" style={{marginTop: "100px"}}>
                        <Button variant="warning" className="btn-circle btn-lg" onClick={ () => confirmRequest(true)}>
                            <FontAwesomeIcon icon="check" size="1x" />
                        </Button>
                        <Button variant="secondary" className="btn-circle btn-lg" onClick={redirectRequestMatch}>
                            <FontAwesomeIcon icon="times" size="1x" />
                        </Button>
                    </div>
                    </div>
                </Col>
                <Col sm={6}>
                    nnn
                </Col>
            </Row>
        </React.Fragment>
    )
}

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
};