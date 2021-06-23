import React from 'react'
import './Watermark.css'
import { Avatar } from "@material-ui/core";

function Watermark(props){
    return (
        <div className="watermark">
            <span className="logoText">{props.name}</span>
            <Avatar alt="Remy Sharp" src={props.avatar} />
        </div>
    )
}

export default Watermark