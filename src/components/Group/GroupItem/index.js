import React from "react";
import { Card } from "react-bootstrap";

export default function GroupItem(props) {
    return (
        <Card >
            <div className="group-item-img" style={{backgroundImage: `url(${props.bgImage})`}}>
            </div>
            <Card.Body>
                <Card.Title className="group-item-name">{ props.groupName }</Card.Title>
            </Card.Body>
        </Card>
    );
}
