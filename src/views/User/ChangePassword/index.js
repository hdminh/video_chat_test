import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form
} from 'react-bootstrap';

import PageLoading from '../../../components/PageLoading/pageLoading';


export default function Profile(props) {
    // State
    let history = useHistory();
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');
    const [pageLoad, setPageLoad] = useState(false); // Loading page

    // Validation
    const { register, errors, handleSubmit } = useForm();
    const onSubmit = formValues => {
        // form is valid
        const data = {
            password: formValues.passCurrent,
            newpassword: formValues.passNew,
            confirmnewpassword: formValues.passConfirm
        }
        // console.log(data);
        changePass(data);
    }

    const changePass = async (data) => {
        setPageLoad(true);
        await Axios.put('https://togetherapis.herokuapp.com/api/v1/user/changepassword', data, {
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        })
            .then((response) => {
                // console.log(response)
                if (response.status === 200) {
                    setErr(false);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Password changed successfully',
                        showConfirmButton: true,
                        timer: 1500
                    })
                    history.push("/");
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fail',
                    })
                }
            })
            .catch((error) => {
                console.log("error", error.response);
                let result = error.response;
                if (result.status === 400) {
                    // New password != confirm new password
                    setErr(true);
                    setMessage(result.data.message);
                } else if (result.status === 401) {
                    // Old password incorrect
                    setErr(true);
                    setMessage(result.data.message);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fail',
                    })
                }
            });
    }

    return (
        <>
            <Container className="mt-3">
                <Card>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card.Header>
                            <Row>
                                <Col md={12}>
                                    <h5>CHANGE PASSWORD</h5>
                                    <small>It's a good idea to use a strong password that you're not using elsewhere</small>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {err
                                ? <div className="validation" style={{ color: 'red' }}>{message}</div>
                                : null
                            }
                            <Form.Group as={Col} controlId="password_current">
                                <Form.Label>Current</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="passCurrent"
                                    ref={register({
                                        required: 'Password current is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password should be at-least 6 characters.'
                                        }
                                    })} />
                                {errors.passCurrent && (
                                    <p className="errorMsg">{errors.passCurrent.message}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} controlId="password_new">
                                <Form.Label>New</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="passNew"
                                    ref={register({
                                        required: 'Password new is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password should be at-least 6 characters.'
                                        }
                                    })} />
                                {errors.passNew && (
                                    <p className="errorMsg">{errors.passNew.message}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} controlId="password_confirm">
                                <Form.Label>Re-type new</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="passConfirm"
                                    ref={register({
                                        required: 'Password new confirm is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password should be at-least 6 characters.'
                                        }
                                    })} />
                                {errors.passConfirm && (
                                    <p className="errorMsg">{errors.passConfirm.message}</p>
                                )}
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer className="style-card-footer">
                            <Button variant="primary" type="submit">
                                Change password
                            </Button>
                            <Button variant="secondary" className="ml-3" href="/user/profile">Cancel</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
            {pageLoad == true ? <PageLoading /> : ''}
        </>
    )
}