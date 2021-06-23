import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import AccountBox from '@material-ui/icons/AccountBox';
import Tag from '../../../components/Tag/index';
import { getUserInfo } from '../../../api/userApi';

function renderSwitchGender(param) {
    switch (param) {
        case 0:
            return 'Unknow';
        case 1:
            return 'Nam';
        case 2:
            return 'Nữ';
        default:
            return 'Khác';
    };
}

function renderSwitchRelation(param) {
    switch (param) {
        case 0:
            return 'Unknow';
        case 1:
            return 'In relationship';
        case 2:
            return 'Alone';
        default:
            return 'Divorcee';
    };
}

export default function ProfileDialog(props) {
    const [dataProfile, setDataProfile] = useState([]);

    const handleCloseProfile = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        if (props.open) {
            getUserInfo()
                .then((res) => {
                    if (res.status === 200) {
                        setDataProfile(res.data.data);
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [props.open]);

    return (
        <Dialog
            open={props.open}
            onClose={handleCloseProfile}
            scroll="body"
            maxWidth="xs"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogContent>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={dataProfile ? dataProfile.avatar : "https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg"}
                    title="Contemplative Reptile"
                />
                <div className="profile">
                    <div className="profile-name-age">
                        <span className="profile-name" style={{ fontWeight: "700" }}>
                            {dataProfile ? dataProfile.lastname + " " + dataProfile.firstname : ""}
                        </span>
                        <span className="profile-old">
                            &nbsp;22
                        </span>
                    </div>
                    <div className="profile-basic-info">
                        <div className="profile-text_22">
                            Thông tin cơ bản
                        </div>
                        <div className="profile-content">
                            <div className="card-mini-info">
                                <div className="row mt-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <Avatar>
                                            <AccountBox />
                                        </Avatar>
                                    </div>
                                    <div className="col-10 d-flex flex-column" style={{ padding: 0 }}>
                                        <div className="text_20_b">{dataProfile ? dataProfile.lastname + " " + dataProfile.firstname : ""}</div>
                                        <div>Họ tên</div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <Avatar>
                                            <AccountBox />
                                        </Avatar>
                                    </div>
                                    <div className="col-10 d-flex flex-column" style={{ padding: 0 }}>
                                        <div className="text_20_b">
                                            {dataProfile
                                                ? renderSwitchGender(dataProfile.gender)
                                                : ""
                                            }
                                        </div>
                                        <div>Giới tính</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-hobbies">
                        <div className="profile-text_22">
                            Sở thích
                    </div>
                        <div className="profile-content">
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                            <Tag bgColor={"#858585"} text={"Guitar"} textColor={"#FFF"} />
                        </div>
                    </div>
                    <div className="profile-contact">
                        <div className="profile-text_22">
                            Thông tin liên hệ
                        </div>
                        <div className="profile-content">
                            <div className="card-mini-info">
                                <div className="row mt-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <Avatar>
                                            <AccountBox />
                                        </Avatar>
                                    </div>
                                    <div className="col-10 d-flex flex-column" style={{ padding: 0 }}>
                                        <div className="text_20_b">{dataProfile ? dataProfile.phone : ""}</div>
                                        <div>Điện thoại</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-relationship">
                        <div className="profile-text_22">
                            Tình trạng mối quan hệ
                        </div>
                        <div className="profile-content">
                            <div className="card-mini-info">
                                <div className="row mt-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <Avatar>
                                            <AccountBox />
                                        </Avatar>
                                    </div>
                                    <div className="col-10 d-flex flex-column" style={{ padding: 0 }}>
                                        <div className="text_20_b">
                                        {dataProfile
                                                ? renderSwitchRelation(dataProfile.relationship)
                                                : ""
                                            }
                                        </div>
                                        <div>Mối quan hệ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}