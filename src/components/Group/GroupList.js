import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GroupContext } from "../../context/GroupContext";
import GroupItem from './GroupItem/index';
import PageLoading from '../PageLoading/pageLoading';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SamplePrevArrow = (props) => {
    const { className, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon="chevron-left"
                color="#000"
                size="2x"
            />
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
};

export default function GroupList(props) {
    const { grpInfo, listGrp, activeCpn } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;
    const [listGroup, setListGroup] = listGrp;

    const [groupTopList, setGroupTopList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {

        //call api get list top group
        const topList = getListGroup(1, 8, setGroupTopList, setLoading);
        const list = getListGroup(1, 7, setListGroup, setLoading);
    }, []);
    console.log("Group list render");

    return (
        <React.Fragment>
            {loading
                ? <PageLoading />
                : <React.Fragment>
                    <div className="top-group mt-3">
                        <div className="txt_l-s16">
                            Top group
                    </div>
                        <div className="list-top-group">
                            <Slider {...settings}>
                                {groupTopList &&
                                    groupTopList.map((group) => (
                                        <div className="top-group-item" key={group._id}
                                            onClick={() => loadViewDetail(group, setActiveComponent, setGroupInfo)}>
                                            <GroupItem groupName={group.name} groupId={group._id} bgImage={group.avatar} />
                                        </div>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="all-group">
                        <div className="txt_l-s16">
                            Group list
                    </div>
                        <div className="group-list mt-1">
                            {listGroup &&
                                listGroup.map((group) => (
                                    <div className="group-item" key={group._id}
                                        onClick={() => loadViewDetail(group, setActiveComponent, setGroupInfo)}>
                                        <GroupItem groupName={group.name} groupId={group._id} bgImage={group.avatar} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

async function getListGroup(page, rowPerPage, setGroupTopList, setLoading) {
    setLoading(true);
    await axios.get(process.env.REACT_APP_API_BASE_URL + '/group', {
        headers: {
            'auth-token': localStorage.getItem("token")
        },
        params: {
            'page': page,
            'rowsperpage': rowPerPage
        }
    })
        .then((response) => {
            setLoading(false);
            if (response.status === 200) {
                console.log(response)
                setGroupTopList(response.data.data.groups);
                return true
            } else {
                return false;
            }
        })
        .catch((error) => {
            setLoading(false);
            return false;
        })
}

function loadViewDetail(group, setActiveComponent, setGroupInfo) {
    // Lấy thông tin group
    setGroupInfo(group);
    setActiveComponent("detail");
}