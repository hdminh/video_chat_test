import React from "react";
import Avatar from '@material-ui/core/Avatar';

export default function NotificationItem(props) {
    return (
        <div className="row mt-2">
            <div className="col-2 d-flex align-items-center">
                <Avatar alt="Test" src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" />
            </div>
            <div className="col-10 d-flex flex-column">
                <div className="text_20_b">0777 888 888</div>
                <div>Điện thoại</div>
            </div>
        </div>
    );
}
