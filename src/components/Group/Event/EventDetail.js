import React, { useState, useEffect, useContext } from 'react'
import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { GroupContext } from '../../../context/GroupContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaceIcon from '@material-ui/icons/Place';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import EarthImg from '../../../assets/images/Ellipse_36.jpg';
import { Avatar } from '@material-ui/core/Avatar';


export default function EventDetail(props) {
    // context
    const { activeCpn, grpInfo } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;



    return (
        <React.Fragment>
            <div className="btn-return-list-group">
                <div className="btn-like-group">
                    <button type="button" onClick={() => {
                        setActiveComponent("detail");
                    }}>
                        <ArrowBackIcon color="primary" />
                    </button>
                </div>
            </div>

            <Row className="detail-group-event">
                <Col className="detail-event-left">
                    <div className="detail-event-name">
                        <div className="txt-event_20px mr-3">
                            Cuộc gặp mặt đầu tiên của những game thủ Sài gón
                        </div>
                        <div className="event-btn">
                            <div className="btn-edit-event mr-2">
                                <button type="button" onClick={() => {
                                    setActiveComponent("event-edit");
                                }}>
                                    <EditIcon fontSize="small" style={{ color: "#FFF" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="detail-event-description mt-2">
                        Nội dung buổi họp mặt bao gồm
                        <ul>
                            <li>+ Nội dung 1</li>
                            <li>+ Nội dung 1</li>
                            <li>+ Nội dung 1</li>
                        </ul>
                    </div>
                    <div className="detail-event-time mt-2">
                        <div className="txt-event_20px">
                            Event time
                        </div>
                        <div className="time-content d-flex">
                            <div className="tag mt-2">
                                <a
                                    type="button"
                                    className="tag-button"
                                    style={{ backgroundColor: "#C4C4C4", color: "#FFF" }}
                                >
                                    10:00 AM
                                </a>
                                -
                                <a
                                    type="button"
                                    className="tag-button ml-2"
                                    style={{ backgroundColor: "#C4C4C4", color: "#FFF" }}
                                >
                                    04/06/2021
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="detail-event-place mt-2">
                        <div className="txt-event_20px">
                            Event place
                        </div>
                        <div className="place-content">
                            <div className="place-avatar">
                                <img src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" alt="avatar place" />
                            </div>
                            <Row className="place-info">
                                <Col md={8}>
                                    <div className="txt-event_18px">
                                        Nhà hàng full service ĐH Khoa học tự nhiên
                                    </div>
                                </Col>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <PlaceIcon fontSize="small" style={{ color: "#FFA500" }} />
                                </Col>
                            </Row>
                            <Row className="place-info">
                                <Col md={8}>
                                    <div className="">
                                        227 Nguyễn Văn Cừ, Phường 4, Quận 5, TTP HCM
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="places-info-rate">
                                        <div className="places-info-rate-star mr-4">
                                            5 <StarIcon fontSize="small" style={{ color: "#FFA500" }} />
                                        </div>
                                        <div className="places-info-rate-review">
                                            10 reviews
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="detail-event-submit mt-2">
                        <Button type="button" style={{ width: "100%" }} className="btn_ffa500">
                            I will come
                        </Button>
                    </div>
                </Col>
                <Col className="detail-event-right">
                    <div className="detail-event-chat_header">
                        <div className="icon-event-of-group mr-2">
                            <img src={EarthImg} alt="" />
                        </div>
                        <div className="text-event-of-group">
                            <div className="txt-event_20px">
                                How do you thing about this Event ?
                            </div>
                        </div>
                    </div>
                    <div className="detail-event-chat_body">

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}