import React, { useState } from 'react';
import {
    Col
} from 'react-bootstrap';

// component
import Filter from '../../components/Filters/index';
import RequestMatch from '../../components/RequestMatch/index';
import Match from '../../components/Match/index';


export default function Encounter(props) {
    const [isHaveUserMatch, setIsHaveUserMatch] = useState(false);
    
    return (
        <React.Fragment>
            {/* Start general information MIDDLE */}
            <Col sm={3} style={{ padding: '0px'}}>
                <div className="container-fluid info-container">
                   <Filter />
                </div>
                {/* <button onClick={test}>Test</button> */}
            </Col>
            {/* Start content RIGHT */}
            <Col sm={8}>
                {/* Nếu đã nhận noti thì render match */}
                { isHaveUserMatch === false 
                ? <RequestMatch isMatch={isHaveUserMatch} setIsMatch={setIsHaveUserMatch} /> 
                : <Match isMatch={isHaveUserMatch} setIsMatch={setIsHaveUserMatch}/> }
                
            </Col>
            {/* End content RIGHT */}
            {/* End general information MIDDLE */}
            
        </React.Fragment>
    )
}
