import React, { useState } from 'react';
import axios from 'axios';
import firebase from "firebase/app";
import "firebase/messaging";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import ReactDOM from 'react-dom';


/**
 * Import API
 */
import { confirmRequestMatch } from '../../api/matchApi';


export default function ModalMatch(props) {
    const userMatchInform = props.userInformMatch;
    const TIME_OUT = (userMatchInform.timeout - Date.now()) / 1000;
    console.log(userMatchInform);
    const handleClose = () => {
        props.setIsProcessMatching(false);
    };
    // call api confirm request
    async function confirmRequestMatchHandler(isConfirm) {
        const dataRequestMatch = {
            status: isConfirm,
            id: userMatchInform.notificationid,
        }
        await confirmRequestMatch(dataRequestMatch)
            .then((response) => {
                if (response.status === 200) {
                }
                else {
                    console.error("Confirm request match", response);
                }
            })
            .catch((error) => {
                console.error("Confirm request match", error, error.message);
            });
        handleClose();
    }
    // Cancel confirm and redirect view request match


    const renderTime = ({ remainingTime }) => {
        // if (remainingTime === 0) {
        //     return <div className="timer">Too late...</div>;
        // }
        return (
            <div className="timer">
                <div className="avt-matcher">
                    <Avatar alt="Remy Sharp" style={{ height: "60px", width: "60px" }}
                        src={userMatchInform.avatar} />
                </div>
                <div className="name-matcher">
                    {userMatchInform.fullname}
                </div>
                <div className="text-matcher">Accept to connect to your new friend!</div>
                <div className="time-value-matcher">{remainingTime}</div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(<Dialog
                    open={props.isProcessMatching}
                    disableBackdropClick={true}
                    onClose={handleClose}
                >
                    {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                        <div className="d-flex justify-content-around">
                            <CountdownCircleTimer
                                isPlaying
                                size={250}
                                duration={TIME_OUT}
                                colors={"#FFA500"}
                             onComplete={ () => {
                                handleClose();
                            }}
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        </div>
                    </DialogContent>

                    <div className="d-flex justify-content-around mb-3" style={{ marginTop: "80px" }}>
                        <button className="btn-circle" style={{ backgroundColor: "#858585" }} onClick={() => confirmRequestMatchHandler(false)}>
                            <FontAwesomeIcon icon="times" size="2x" />
                        </button>
                        <button className="btn-circle" style={{ backgroundColor: "#FFA500" }} onClick={() => confirmRequestMatchHandler(true)}>
                            <FontAwesomeIcon icon="check" size="2x" />
                        </button>
                    </div>
                </Dialog>, document.getElementById('modal-root'))}
        </React.Fragment>
    );
}

