import React, { useState, useEffect, useContext } from 'react'
import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { GroupContext } from '../../../context/GroupContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EarthImg from '../../../assets/images/Ellipse_36.jpg';
import TimerIcon from '@material-ui/icons/Timer';
import PlaceIcon from '@material-ui/icons/Place';

export default function EventEdit(props) {
    // context
    const { activeCpn, grpInfo } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;

    // state
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');

    // validate
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = async () => {

    }
    useEffect(() => {
        console.log(groupInfo);

    }, [])

    return (
        <React.Fragment>
            <div className="btn-return-list-group">
                <div className="btn-like-group mr-2">
                    <button type="button" onClick={() => {
                        setActiveComponent("list");
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
                            Edit event for
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
                                            <TimerIcon fontSize="small"/>
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
                                        <Button type="button" className="btn_ffa500">
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
                                    Update Event
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                
            </div>
        </React.Fragment>
    );
}