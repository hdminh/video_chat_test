import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Container,
    Row,
    Col,
    Card,
    Modal,
    Button,
    Form
} from 'react-bootstrap'

export default function Profile(props) {
    let history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        // This is similar to componentDidMount
        // Call back-end api here
        Axios.get('https://togetherapis.herokuapp.com/api/v1/user', {
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    let result = response.data;
                    setFirstName(result.data.firstname);
                    setLastName(result.data.lastname);
                    setEmail(result.data.username);
                    setPhone(result.data.phone);
                    setGender(result.data.gender);
                    setAddress(result.data.address);
                    if (gender == 1) {
                        setGender('Male');
                    } else {
                        setGender('Female')
                    }
                    var ts = new Date(result.data.dateofbirth);
                    setBirthday(ts.toLocaleDateString());
                } else {
                    // not found
                    history.push("/");
                }

            })
            .catch((error) => {
                history.push("/");
            });
    }, [])

    return (
        <>
            <Container>
                <Row className="mt-3">
                    <Col lg={2} className="list-info">
                        <h4 >User Profile</h4>
                        <ul className="list-group list-group-flush profile">
                            <li className="list-group-item">
                                <a href="#">
                                    <FontAwesomeIcon icon="user" /> User profile
                            </a>
                            </li>
                            <li className="list-group-item">
                                <a href="#">
                                    <FontAwesomeIcon icon="bell" /> Notifications
                            </a>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title>PROFESSIONAL PROFILE</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg"
                                    className="profile-image" />
                            </Card.Body>
                            <Card.Footer className="style-card-footer">
                                <div>
                                    <Row>
                                        <Col lg={6}>
                                            <div>Name:</div>
                                            <div>Birthday:</div>
                                        </Col>
                                        <Col lg={6}>
                                            <div>{firstName} {lastName}</div>
                                            <div>{birthday}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col md={10}><h5>ABOUT ME</h5></Col>
                                    <Col md={2}>
                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            <FontAwesomeIcon icon="edit" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div className="flex-container">
                                    <div style={{ marginRight: 20 }}>
                                        <div>First name:</div>
                                        <div>Last name:</div>
                                        <div>Email:</div>
                                        <div>Phone:</div>
                                        <div>Sex:</div>
                                        <div>Address:</div>

                                    </div>
                                    <div >
                                        <div>{firstName}</div>
                                        <div>{lastName}</div>
                                        <div>{email}</div>
                                        <div>{phone}</div>
                                        <div>{gender}</div>
                                        <div>{address}</div>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer className="style-card-footer">
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function MyVerticallyCenteredModal(props) {
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');

    // Validation
    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        // This is similar to componentDidMount
        // Call back-end api here
        Axios.get('https://togetherapis.herokuapp.com/api/v1/user', {
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    let result = response.data;
                    setFirstName(result.data.firstname);
                    setLastName(result.data.lastname);
                    setEmail(result.data.username);
                    setPhone(result.data.phone);
                    setGender(result.data.gender);
                    setAddress(result.data.address);
                    if (gender == 1) {
                        setGender('Male');
                    } else {
                        setGender('Female')
                    }
                }

            })
            .catch((error) => {

            });
    }, [])

    const onSubmit = formValues => {
        // birthday
        let ts = '';
        if (formValues.birthday != "") {
            ts = new Date(formValues.birthday).getTime();
        }
        const data = {
            firstname: formValues.firstName,
            lastname: formValues.lastName,
            // email: formValues.email,
            phone: formValues.phone,
            gender: formValues == 1 ? 1 : 0,
            address: formValues.address,
            dateofbirth: ts
        }
        updateProfile(data);
    }


    // call api
    const updateProfile = async (data) => {
        console.log(data);
        await Axios.patch('https://togetherapis.herokuapp.com/api/v1/user/update', data, {
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Update profile successfully',
                        showConfirmButton: true,
                        timer: 1500
                    })
                    history.push("/");
                }
            })
            .catch((error) => {
                let result = error.response;
                if (result.status === 400) {
                    // Not found
                    setErr(true);
                    setMessage(result.data.message);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Update profile fail',
                    })
                }
            });
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cập nhật thông tin cá nhân
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {err
                        ? <div className="validation" style={{ color: 'red' }}>{message}</div>
                        : null
                    }
                    <Form.Row>
                        <Form.Group as={Col} controlId="fFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control placeholder="Enter first name" defaultValue={firstName} name="firstName"
                                ref={register({ required: 'First name is required' })} />
                            {errors.firstName && (
                                <p className="errorMsg">{errors.firstName.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} controlId="fLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control placeholder="Enter last name" defaultValue={lastName} name="lastName"
                                ref={register({ required: 'Last name is required' })} />
                            {errors.lastName && (
                                <p className="errorMsg">{errors.lastName.message}</p>
                            )}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="fEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" defaultValue={email} name="email"
                                ref={register({
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: 'Email is not valid.'
                                    }
                                })} />
                            {errors.email && (
                                <p className="errorMsg">{errors.email.message}</p>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="fPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="Enter your phone number" defaultValue={phone} name="phone"
                                ref={register({ 
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9\b]+$/,
                                        message: 'Phone number is not valid.'
                                    }
                                    })} />
                            {errors.phone && (
                                <p className="errorMsg">{errors.phone.message}</p>
                            )}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fGender">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="gender" ref={register}>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="fBirthday">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control type="date" name="birthday" ref={register} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="fAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Enter address" defaultValue={address} name="address" ref={register} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Cancle</Button>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}