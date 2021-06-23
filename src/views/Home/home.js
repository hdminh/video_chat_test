import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

// component
import Filter from '../../components/Filters/index';
import RequestMatch from '../../components/RequestMatch/index';



export default function Home(props) {

    const defaultMap = {
        center: {
            lat: 10.6758144,
            lng: 106.594304
        },
        zoom: 11
    };
    const [isProcessMatching, setIsProcessMatching] = useState(false);
    const [userMatching, setUserMatching] = useState({});
    const [matchNowBody, setMatchNowBody] = useState({
        minage: 18,
        maxage: 90,
        distance: 5,
        gender: 1,
        relationship: 1,
    });

    /**
     * Get Match now body from filter
     * @param {Ojbect} matchNowBodyFilterData 
     * @param {number} minage
     * @param {number} maxage
     * @param {number} distance
     * @param {number} gender
     * @param {number} relationship
     */
    const setMatchNowBodyFromFilter = (matchNowBodyFilterData) => {
        setMatchNowBody({
            minage: matchNowBodyFilterData.minage,
            maxage: matchNowBodyFilterData.maxage,
            distance: matchNowBodyFilterData.distance,
            gender: matchNowBodyFilterData.gender,
            relationship: matchNowBodyFilterData.relationship
        });
    }

    const setUserMatchingHandler = (userMatched) => {
        if (userMatched)
            setUserMatching({
                fullname: userMatched.fullname,
                avatar: userMatched.avatar,
                notificationid: userMatched.notificationid,
                timeout: userMatched.timeout
            })
    }


    return (
        <React.Fragment>
            {/* Start general information MIDDLE */}
            <Col sm={3} style={{ padding: '0px' }}>
                <div className="container-fluid info-container">
                    <Filter setMatchNowBodyFromFilter={setMatchNowBodyFromFilter} matchNowDefaultValue={matchNowBody} />
                    <RequestMatch matchNowBody={matchNowBody} setIsProcessMatching={setIsProcessMatching} setUserMatchingHandler={setUserMatchingHandler} />
                </div>
            </Col>
            {/* Start content RIGHT */}
            <Col sm={8} style={{ padding: "0" }}>
                {/* Nếu đã nhận noti thì render match */}
                {/* {isHaveUserMatch === false
                    ? <RequestMatch isMatch={isHaveUserMatch} setIsMatch={setIsHaveUserMatch} />
                    : <Match isMatch={isHaveUserMatch} setIsMatch={setIsHaveUserMatch} />} */}

                {/* UPDATE 10/04/2021, Nếu tìm thấy người match thì show dialog */}

                <div style={{ height: '100vh', width: '100%' }}>
                    {/* <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                        defaultCenter={defaultMap.center}
                        defaultZoom={defaultMap.zoom}
                    >
                    </GoogleMapReact> */}
                </div>
            </Col>
            {/* End content RIGHT */}
            {/* End general information MIDDLE */}

        </React.Fragment>
    )
}