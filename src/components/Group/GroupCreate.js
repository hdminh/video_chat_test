import React, { useState, useEffect, useContext } from 'react';
import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { GroupContext } from '../../context/GroupContext';
import { useForm } from 'react-hook-form';
import { uploadFile } from '../../api/storageApi';
import { getAllTag } from '../../api/tagApi';
import { createGroup } from '../../api/groupApi';

import DropZone from '../../components/Dropzone/index';
import Tag from '../../components/Tag/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PageLoading from '../PageLoading/pageLoading';
import { ToastContainer, toast } from 'react-toastify';

export default function GroupCreate(props) {
    // context
    const { activeCpn } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    // state
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading page
    const [allTag, setAllTag] = useState(null); // tất cả tag
    const [arrTag, setArrTag] = useState([]); // những tag được chọn

    const [masterFile, setMasterFile] = useState({
        file: null,
        preview: null,
        accessURL: null,
        uploadURL: null
    });

    // add or remove tag in arrTag
    const handleClickTag = (tagId) => {
        console.log("tag clicked");
        if (arrTag.includes(tagId)) {
            setArrTag(arrTag.filter(item => item !== tagId));
        } else {
            setArrTag(oldArray => [...oldArray, tagId]);
        }
    }

    // validate
    const { register, errors, handleSubmit } = useForm();

    // submit form
    const onSubmit = async (formValues) => {
        console.log(masterFile);
        await uploadFile(masterFile.uploadURL, masterFile)
            .then((res2) => {
                console.log("res upload is: ", res2)
            })
            .catch((err2) => {
                console.log("error: ", err2.message)
            });

        const data = {
            name: formValues.groupName,
            description: formValues.groupDescription,
            isprivate: formValues.groupPrivacy,
            avatar: masterFile.accessURL ? masterFile.accessURL : "",
            tag: arrTag,
        };

        await createGroup(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Thêm thành công");
                    toast.success("Create group successful!");
                    setActiveComponent("list")
                }
            })
            .catch((err) => {
                console.log("error: ", err.message)
            })
    }

    useEffect(
        () => {
            setLoading(true);
            // get all tag
            getAllTag()
                .then((res) => {
                    if (res.status === 200) {
                        setAllTag(res.data.data);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("error: ", err.message)
                })
        },
        []
    )

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
                    <div className="create-group-content">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mt-2 col-12">
                                {err
                                    ? <div className="validation" style={{ color: 'red' }}>{message}</div>
                                    : null
                                }
                                <Form.Group controlId="formBasicEmail" style={{ width: "100%" }}>
                                    <Form.Label>Group name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter group name" name="groupName"
                                        ref={register({
                                            required: 'Group name is required'
                                        })} />
                                    {errors.groupName && (
                                        <p className="errorMsg">{errors.groupName.message}</p>
                                    )}
                                </Form.Group>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={6} placeholder="Enter description" name="groupDescription"
                                            ref={register({
                                                required: 'Group description is required'
                                            })} />
                                        {errors.groupDescription && (
                                            <p className="errorMsg">{errors.groupDescription.message}</p>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Upload Avatar</Form.Label>
                                    <DropZone
                                        selectedFile={masterFile}
                                        setSelectedFile={setMasterFile}
                                    />
                                </Col>
                            </Row >
                            <Row className="d-flex flex-column mt-2 col-12">
                                <Form.Label>Group tag</Form.Label>
                                <div className="d-flex flex-wrap">
                                    {allTag &&
                                        allTag.map((tag) => (
                                            <Tag
                                                bgColor={arrTag.includes(tag._id) ? "#FFA500" : "#C4C4C4"}
                                                textColor={arrTag.includes(tag._id) ? "#FFF" : "#000"}
                                                text={tag.name}
                                                key={tag._id}
                                                onClick={e => handleClickTag(tag._id)}
                                            />
                                        ))}
                                </div>
                            </Row>
                            <Row className="d-flex flex-column mt-2 col-12">
                                <Form.Label>Group privacy</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Check is private group"
                                    name="groupPrivacy"
                                    ref={register()}
                                />
                            </Row>
                            <Row className="mt-3 col-12 d-flex justify-content-end">
                                <Button type="submit" className="custom-btn_ffa500">Submit</Button>
                            </Row>
                        </Form>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <ToastContainer />
                </React.Fragment>
            }
        </React.Fragment>
    )
}