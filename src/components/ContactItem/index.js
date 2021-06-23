import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContactItem(props) {
    const userId = localStorage.getItem("userid")
    const matchInfor = props.matchInfor;
    const participant = matchInfor.participants.find((item)=>item._id!==userId);
    const lastMsgArray = matchInfor.messages.pop();
    console.log(lastMsgArray);
        let lastMsg = {
            message: "Say hi",
            type: "text"
        };
        if(lastMsgArray && lastMsgArray.data){
             lastMsg = lastMsgArray.data.pop();
        }
  return (
    <div className="msg-item" onClick={props.onClick}>
        <div className="item">
            {/* avater */}
            <div style={{position: 'relative'}}>
                <div className="avatar-msg avatar-msg--m ">
                    <img className="avatar-img outline" alt=""
                    src={participant.avatar[0]} />
                </div>
            </div>
            {/* item content */}
            <div className="item-content-container">
                <div className="item-title d-flex align-items-center ">
                    <div className="item-title-name">
                        <span>{`${participant.firstname} ${participant.lastname}`}</span>
                    </div>
                    <div className="item-title-timestamp">
                        {/* <span>2 gio</span> */}
                        <span>
                            <FontAwesomeIcon icon="circle" size="1x" color="#FFA500" style={{height: "10px"}}/>
                        </span>
                    </div>
                </div>
                <div className="d-flex align-items-center"> 
                    <div className="item-message truncate">
                        <div className="truncate">
                            <div style={{ lineHeight: "20px" }}>
                                <span>{}</span>
                            </div>
                        </div>
                    </div>
                    <div className="item-action">
                        <div className="item-action__menu ">
                            <i className="fa fa-tab-icon-more func-setting__icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
