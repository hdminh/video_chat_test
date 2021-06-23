import React, { useState, useEffect, useContext } from 'react'
import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { GroupContext } from '../../../context/GroupContext';
import EarthImg from '../../../assets/images/Ellipse_36.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TimerIcon from '@material-ui/icons/Timer';
import PlaceIcon from '@material-ui/icons/Place';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import StarIcon from '@material-ui/icons/Star';

import Tag from '../../Tag/index';
// import StarIcon from '../../../assets/icons/star.svg';

import { withStyles } from '@material-ui/core/styles';
const TogetherRadio = withStyles({
    root: {
        color: "#FFA500",
        '&$checked': {
            color: '#FFA500',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default function EventCreate(props) {
    // context
    const { activeCpn, grpInfo } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;

    // state
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');

    // dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        console.log(123);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = React.useRef(null);
    // radio
    const [selectedValue, setSelectedValue] = React.useState('a');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // validate
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = async () => {

    }

    useEffect(() => {
        console.log(groupInfo);
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open])

    return (
        <React.Fragment>
            <div className="btn-return-list-group">
                <div className="btn-like-group mr-2">
                    <button type="button" onClick={() => {
                        setActiveComponent("detail");
                    }}>
                        <ArrowBackIcon color="primary" />
                    </button>
                </div>
            </div>
            <div className="create-group-event">
                <div className="event-top">
                    <div className="icon-event-of-group mr-2">
                        <img src={EarthImg} alt="" />
                    </div>
                    <div className="text-event-of-group">
                        <div>
                            Create event for
                        </div>
                        <div>
                            {groupInfo.name}

                        </div>
                    </div>
                </div>
                <div className="event-body mt-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mt-2">
                            <Col>
                                {err
                                    ? <div className="validation" style={{ color: 'red' }}>{message}</div>
                                    : null
                                }
                                <Form.Group controlId="fmEventTitle" style={{ width: "100%" }}>
                                    <Form.Label>Tilte</Form.Label>
                                    <Form.Control type="text" placeholder="Enter event title" name="event_title"
                                        ref={register({
                                            required: 'Event tilte is required'
                                        })} />
                                    {errors.event_title && (
                                        <p className="errorMsg">{errors.event_title.message}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Group controlId="fmEventDesc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={6} placeholder="Enter description" name="event_description"
                                        ref={register({
                                            required: 'Event description is required'
                                        })} />
                                    {errors.event_description && (
                                        <p className="errorMsg">{errors.event_description.message}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Label>Time</Form.Label>
                                <div className="d-flex justify-content-between">
                                    <div className="mr-2" style={{ width: "100%" }}>
                                        <Form.Group controlId="fmEventTime" style={{ width: "100%" }}>
                                            <Form.Control type="text" placeholder="18:00 AM" name="event_time" />
                                        </Form.Group>
                                    </div>
                                    <div className="">
                                        <Button type="button" className="btn_ffa500">
                                            <TimerIcon fontSize="small" />
                                        </Button>
                                    </div>
                                </div>
                                {errors.event_time && (
                                    <p className="errorMsg">{errors.event_time.message}</p>
                                )}
                            </Col>
                            <Col md={8}>
                                <Form.Label>Place</Form.Label>
                                <div className="d-flex justify-content-between">
                                    <div className="mr-2" style={{ width: "100%" }}>
                                        <Form.Group controlId="fmEventPlace" style={{ width: "100%" }}>
                                            <Form.Control type="text" placeholder="227 Nguyen Van Cu" name="event_place" />
                                        </Form.Group>
                                    </div>
                                    <div className="">
                                        <Button type="button" className="btn_ffa500" onClick={handleClickOpen}>
                                            <PlaceIcon fontSize="small" />
                                        </Button>
                                    </div>
                                </div>
                                {errors.event_place && (
                                    <p className="errorMsg">{errors.event_place.message}</p>
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Button type="button" style={{ width: "100%" }} className="btn_ffa500">
                                    Create Event
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={"paper"}
                    fullWidth={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Chọn địa điểm</DialogTitle>
                    <DialogContent dividers={'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <div className="event-choose-places">
                                {/* Search bar */}
                                <div className="event-search-bar">
                                    <FontAwesomeIcon icon="search" size="1x" color="#858585" className="ml-3" />
                                    <input
                                        style={{ marginLeft: "1vh", marginTop: "1vh" }}
                                        type="text"
                                        className="search-places-input"
                                        placeholder="Enter search"

                                    />
                                </div>
                                <div className="event-search-filter mt-3">
                                    <Tag
                                        text="Food"
                                        bgColor="#FFA500"
                                        textColor="#FFF"
                                    />
                                    <Tag
                                        text="Coffee"
                                        bgColor="#FFA500"
                                        textColor="#FFF"
                                    />
                                    <Tag
                                        text="Restaurant"
                                        bgColor="#FFA500"
                                        textColor="#FFF"
                                    />
                                </div>
                                <div className="event-list-places mt-2">
                                    <div className="event-places-item">
                                        <div className="places-item-avatar">
                                            <img src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" alt="ahih" />
                                        </div>
                                        <div className="places-item-content">
                                            <div className="places-item-name">
                                                Nhà hàng ĐH Khoa học Tự nhiên TPHCM
                                            </div>
                                            <div className="places-item-rate">
                                                <div className="item-rate-star mr-4">
                                                    5 <StarIcon fontSize="small" style={{ color: "#FFA500" }} />
                                                </div>
                                                <div className="item-rate-review">
                                                    10 reviews
                                                </div>
                                            </div>
                                            <div className="places-item-address">
                                                227 Nguyễn Văn Cừ, Phường 4, Quận 5
                                            </div>
                                        </div>
                                        <div className="places-item-choose_radio">
                                            <div className="circle_outline-radio">
                                                <TogetherRadio
                                                    // checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    color="default"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                    style={{ height: "2rem", width: "2rem" }}
                                                />
                                                {/* <Form.Check type="radio" aria-label="radio 1" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-places-item mt-2">
                                        <div className="places-item-avatar">
                                            <img src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" alt="ahih" />
                                        </div>
                                        <div className="places-item-content">
                                            <div className="places-item-name">
                                                Nhà hàng ĐH Khoa học Tự nhiên TPHCM
                                            </div>
                                            <div className="places-item-rate">
                                                <div className="item-rate-star mr-4">
                                                    5 <StarIcon fontSize="small" style={{ color: "#FFA500" }} />
                                                </div>
                                                <div className="item-rate-review">
                                                    10 reviews
                                                </div>
                                            </div>
                                            <div className="places-item-address">
                                                227 Nguyễn Văn Cừ, Phường 4, Quận 5
                                            </div>
                                        </div>
                                        <div className="places-item-choose_radio">
                                            <div className="circle_outline-radio">
                                                <TogetherRadio
                                                    // checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    color="default"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                    style={{ height: "2rem", width: "2rem" }}
                                                />
                                                {/* <Form.Check type="radio" aria-label="radio 1" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-places-item mt-2">
                                        <div className="places-item-avatar">
                                            <img src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" alt="ahih" />
                                        </div>
                                        <div className="places-item-content">
                                            <div className="places-item-name">
                                                Nhà hàng ĐH Khoa học Tự nhiên TPHCM
                                            </div>
                                            <div className="places-item-rate">
                                                <div className="item-rate-star mr-4">
                                                    5 <StarIcon fontSize="small" style={{ color: "#FFA500" }} />
                                                </div>
                                                <div className="item-rate-review">
                                                    10 reviews
                                                </div>
                                            </div>
                                            <div className="places-item-address">
                                                227 Nguyễn Văn Cừ, Phường 4, Quận 5
                                            </div>
                                        </div>
                                        <div className="places-item-choose_radio">
                                            <div className="circle_outline-radio">
                                                <TogetherRadio
                                                    // checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    color="default"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                    style={{ height: "2rem", width: "2rem" }}
                                                />
                                                {/* <Form.Check type="radio" aria-label="radio 1" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-places-item mt-2">
                                        <div className="places-item-avatar">
                                            <img src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" alt="ahih" />
                                        </div>
                                        <div className="places-item-content">
                                            <div className="places-item-name">
                                                Nhà hàng ĐH Khoa học Tự nhiên TPHCM
                                            </div>
                                            <div className="places-item-rate">
                                                <div className="item-rate-star mr-4">
                                                    5 <StarIcon fontSize="small" style={{ color: "#FFA500" }} />
                                                </div>
                                                <div className="item-rate-review">
                                                    10 reviews
                                                </div>
                                            </div>
                                            <div className="places-item-address">
                                                227 Nguyễn Văn Cừ, Phường 4, Quận 5
                                            </div>
                                        </div>
                                        <div className="places-item-choose_radio">
                                            <div className="circle_outline-radio">
                                                <TogetherRadio
                                                    // checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    color="default"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                    style={{ height: "2rem", width: "2rem" }}
                                                />
                                                {/* <Form.Check type="radio" aria-label="radio 1" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="button" className="btn_ffa500">
                            Choose
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </React.Fragment>
    );
}