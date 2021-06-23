import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export default function Chips(props) {
    return (
        <Chip
            avatar={<Avatar alt="Natacha" src={props.linkAvatar} />}
            label={props.label} className={props.chipStyle}
            style={{ cursor: "pointer" }}>
        </Chip>
    );
}