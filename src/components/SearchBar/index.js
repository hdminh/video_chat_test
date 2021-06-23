import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";

export default function SearchBar(props) {
  return (
    <div>
      <Row className="search-bar">
        <Col sm={10}>
          <input
            style={{ marginLeft: "1vh", marginTop: "1vh" }}
            type="text"
            className="search-input"
            placeholder="Enter search"
            onChange={props.onChange}
            
          />
        </Col>
        <Col sm={2}>
          <button
            className="search-button"
            onClick={props.onClick}
            style={{ marginRight: "3vh"}}
            autoFocus
          >
            <FontAwesomeIcon icon="search" size="1x" color="#858585" />
          </button>
        </Col>
      </Row>
    </div>
  );
}
