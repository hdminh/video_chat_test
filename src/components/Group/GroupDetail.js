import React, { useEffect, useContext, useState } from "react";
import {
    Col,
    Row,
    Table
} from 'react-bootstrap';
import { GroupContext } from "../../context/GroupContext";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tag from '../../components/Tag/index';
import PageLoading from '../PageLoading/pageLoading';

// api
import { sendReqJoinGroup } from '../../api/groupApi';
import { getUserById } from '../../api/userApi';

const userid = localStorage.getItem("userid");

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    appBarCustom: {
        color: '#FFA500',
        backgroundColor: '#FFF'
    },
    tabRoot: {
        textTransform: 'none',
        minWidth: '60px'
    },
    avatarRoot: {
        width: "30px",
        height: "30px"
    }
}));

export default function GroupDetail(props) {
    const classes = useStyles();
    const { grpInfo, activeCpn } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;

    const [hostInfo, setHostInfo] = useState('');
    const [reqJoin, setReqJoin] = useState(false);
    const [reasonJoin, setReasonJoin] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = React.useState('1'); // switch tab
    const [loading, setLoading] = useState(false); // loading page

    const handleClickOpen = () => {
        console.log("group detail clicked");

        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setLoading(true);
        const hostId = groupInfo.host;
        getUserById(hostId)
            .then((res) => {
                if (res.status === 200) {
                    setHostInfo(res.data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                return null;
            });
    }, [groupInfo._id])

    return (
        <React.Fragment>
            { loading
                ? <PageLoading />
                : <React.Fragment>
                    <div className="btn-return-list-group">
                        <div className="btn-like-group mr-2">
                            <button type="button" onClick={() => {
                                setActiveComponent("list");
                            }}>
                                <ArrowBackIcon color="primary" />
                            </button>
                        </div>
                    </div>
                    <Row className="group-detail-top">
                        {/* AVATAR */}
                        <div className="group-detail-avatar">
                            <img src={groupInfo.avatar} alt="group detail avatar" />
                        </div>
                        {/* BUTTON */}
                        {userid === groupInfo.host
                            ? (
                                // START: View of viewer and member
                                <div className="btn-group-like-group">
                                    <div className="btn-like-group d-flex justify-content-center mr-2">
                                        <button type="button" onClick={() => {
                                            setActiveComponent("edit")
                                        }}>
                                            <FontAwesomeIcon icon="edit" size="sm" color="#FFA500" />
                                        </button>
                                    </div>
                                </div>
                            )
                            : (
                                //  START: View of host
                                <div className="btn-group-like-group">
                                    <div className="btn-like-group d-flex justify-content-center mr-2">
                                        <button type="button" >
                                            <FontAwesomeIcon icon="heart" size="sm" color="#FFA500" />
                                        </button>
                                    </div>
                                    <div className="btn-like-group d-flex justify-content-center">
                                        {
                                            reqJoin === false
                                                ? <button type="button" onClick={handleClickOpen}>
                                                    <FontAwesomeIcon icon="plus-square" size="sm" color="#FFA500" />
                                                </button>
                                                : <button type="button">
                                                    <FontAwesomeIcon icon="arrow-alt-circle-right" size="sm" color="#FFA500" />
                                                </button>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Row>
                    <Row className="group-detail-bot mt-3">
                        <Col sm={6}>
                            <div className="bot_left">
                                <div className="txt_l-s16">
                                    {groupInfo.name !== null ? groupInfo.name : ""}
                                </div>
                                <div className="d-flex justify-content-start">
                                    <div className="group-type mr-3">
                                        <div className="group-privacy">
                                            {groupInfo.isprivate === true
                                                ? "Private Group"
                                                : "Public group"
                                            }
                                        </div>
                                        <div className="group-number-member">
                                            {groupInfo.participant.length} thành viên
                                </div>
                                    </div>
                                    <div className="avt-member">
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Remy Sharp" src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" />
                                            <Avatar alt="Remy Sharp" src="https://yt3.ggpht.com/ytc/AAUvwnjyHPfxxlEjIsje7BF_6-Ns844XBXm7tTou9bdQ=s900-c-k-c0x00ffffff-no-rj" />
                                            <Avatar alt="Remy Sharp" src="https://img.thuthuattinhoc.vn/uploads/2020/05/30/hinh-anh-luffy-bi-thuong-mau-me-rat-ngau_055520573.jpg" />
                                            <Avatar alt="Remy Sharp" src="https://img.thuthuattinhoc.vn/uploads/2020/05/30/hinh-anh-luffy-bi-thuong-mau-me-rat-ngau_055520573.jpg" />
                                            <Avatar alt="Remy Sharp" src="https://img.thuthuattinhoc.vn/uploads/2020/05/30/hinh-anh-luffy-bi-thuong-mau-me-rat-ngau_055520573.jpg" />
                                        </AvatarGroup>
                                    </div>
                                </div>

                                <div className="group-tag mt-3">
                                    {groupInfo.tag &&
                                        groupInfo.tag.map((tag) => (
                                            <Tag
                                                bgColor={"#C4C4C4"}
                                                textColor={"#FFF"}
                                                text={tag.name}
                                                key={tag._id}
                                            />
                                        ))}
                                </div>
                                <div className="group-description mt-3">
                                    Description
                            <p>{groupInfo.description !== null ? groupInfo.description : ""}</p>
                                </div>
                            </div>

                        </Col>
                        <Col sm={6}>
                            <div className="bot_right">
                                {/*  */}
                                <div className="number_likes">
                                    <span className="txt_l-s16"> {groupInfo.star !== null ? groupInfo.star : 0} </span>
                                    <FontAwesomeIcon icon="heart" size="lg" color="#FFA500" />
                                </div>
                                {userid === groupInfo.host
                                    ? (
                                        <table className="mt-3">
                                            <thead>
                                                <tr className="boder-style_hidden">
                                                    <th scope="col-7" className="event-host-header">
                                                        <div className="event-host-title">
                                                            Events
                                                </div>
                                                    </th>
                                                    <th scope="col-5">
                                                        <div className="event-host-add">
                                                            <button type="button" className="custom-btn_ffa500"
                                                                onClick={() => setActiveComponent("event-create")}
                                                            >
                                                                Add new events
                                                            </button>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="boder-style_hidden">
                                                    <td className="pt-1">
                                                        <div className="d-flex flex-column">
                                                            <div className="event-name" onClick={() => setActiveComponent("event-detail")}>
                                                                Gặp mặt lần đầu tiên của nhóm Guitar Sài Thành
                                                            </div>
                                                            <div className="mt-1 event-address align-items-center">
                                                                <RoomIcon color="primary" />
                                                            Trần Hưng Đạo - Quận 1
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td className="pt-1">
                                                        <div className="event-time">
                                                            20:00 - 01/06/2021
                                                            </div>
                                                        <div className="event-participants">
                                                            <AvatarGroup max={3} >
                                                                <Avatar alt="Remy Sharp" />
                                                                <Avatar alt="Travis Howard" />
                                                                <Avatar alt="Cindy Baker" />
                                                                <Avatar alt="Agnes Walker" />
                                                            </AvatarGroup>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )
                                    : (
                                        // View of viewer and member
                                        <div className={classes.root}>
                                            <TabContext value={value}>
                                                <AppBar position="static" className={classes.appBarCustom} elevation={0}>
                                                    <TabList onChange={handleChange} aria-label="simple tabs example">
                                                        <Tab label="Events" value="1" className={classes.tabRoot} />
                                                        <Tab label="Host" value="2" className={classes.tabRoot} />
                                                    </TabList>
                                                </AppBar>
                                                <TabPanel value="1">
                                                    <div className="list-events">
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <div className="d-flex flex-column">
                                                                    <div className="event-name">
                                                                        Gặp mặt lần đầu tiên của nhóm Guitar Sài Thành
                                                            </div>
                                                                    <div className="mt-1 event-address align-items-center">
                                                                        <RoomIcon color="primary" />
                                                                Trần Hưng Đạo - Quận 1
                                                            </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5">
                                                                <div className="d-flex flex-column">
                                                                    <div className="event-time">
                                                                        2021
                                                            </div>
                                                                    <div className="event-participants">
                                                                        <AvatarGroup max={3} >
                                                                            <Avatar alt="Remy Sharp" />
                                                                            <Avatar alt="Travis Howard" />
                                                                            <Avatar alt="Cindy Baker" />
                                                                            <Avatar alt="Agnes Walker" />
                                                                        </AvatarGroup>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel value="2">
                                                    <div className="host-info">
                                                        <Table>
                                                            <tbody>
                                                                <tr className="boder-style_hidden">
                                                                    <td className="pt-1">
                                                                        <div className="txt_s25">
                                                                            Host information
                                                                </div>
                                                                        <div className="txt_s20">
                                                                            {hostInfo !== null ? `${hostInfo.firstname} ${hostInfo.lastname}` : ""}
                                                                        </div>
                                                                    </td>
                                                                    <td className="pt-1 text-right">
                                                                        <Avatar alt="Remy Sharp" src={hostInfo !== null ? hostInfo.avatar : "https://img.thuthuattinhoc.vn/uploads/2020/05/30/hinh-anh-luffy-bi-thuong-mau-me-rat-ngau_055520573.jpg"} />
                                                                    </td>
                                                                </tr>
                                                                <tr className="boder-style_hidden">
                                                                    <td className="pt-1">Phone</td>
                                                                    <td className="pt-1 ">{hostInfo !== null ? hostInfo.phone : ""}</td>
                                                                </tr>
                                                                <tr className="boder-style_hidden">
                                                                    <td className="pt-1">Gender</td>
                                                                    <td className="pt-1">
                                                                        {hostInfo !== null
                                                                            ? hostInfo.gender === 1 ? "Nam" : "Nữ"
                                                                            : ""
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr className="boder-style_hidden">
                                                                    <td className="pt-1">Relationship status</td>
                                                                    <td className="pt-1">Single</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </TabPanel>
                                            </TabContext>
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">The reason for wanting to join</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To join to this group, please enter your reason here
                    </DialogContentText>
                            <TextField onChange={e => setReasonJoin(e.target.value)} value={reasonJoin}
                                autoFocus
                                margin="dense"
                                id="reason"
                                label="Reason"
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                    </Button>
                            <Button onClick={() => pressReqJoin(groupInfo._id, reasonJoin, setReqJoin, setOpenDialog)} color="primary">
                                Join
                    </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

// Request join group
async function pressReqJoin(groupId, reasonJoin, setReqJoin, setOpenDialog) {
    let reqBody = {
        "groupid": groupId,
        "description": reasonJoin ? reasonJoin : ""
    };
    sendReqJoinGroup(reqBody)
        .then((res) => {
            if (res.status === 200) {
                console.log("req join:", res);
                setReqJoin(true);
                setOpenDialog(false);
            }
        })
        .catch((err) => {
            setOpenDialog(false);
        });
}



